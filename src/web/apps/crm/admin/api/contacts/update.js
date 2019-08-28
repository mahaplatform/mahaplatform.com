import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { updateEmailAddresses } from '../../../services/email_addresses'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const updateRoute = async (req, res) => {

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email_addresses'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const values = await processValues(req, {
    parent_type: 'crm_contacts',
    values: req.body.values
  })

  const email = req.body.email_addresses.find(email => {
    return email.is_primary
  })

  await contact.save({
    email: email.address,
    ...whitelist(req.body, ['first_name','last_name','phone','photo_id']),
    values
  }, {
    transacting: req.trx
  })

  await updateEmailAddresses(req, {
    contact,
    email_addresses: req.body.email_addresses
  })

  await updateRelated(req, {
    object: contact,
    related: 'tags',
    table: 'crm_taggings',
    ids: req.body.tag_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'tag_id'
  })

  await updateRelated(req, {
    object: contact,
    related: 'organizations',
    table: 'crm_contacts_organizations',
    ids: req.body.organization_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'organization_id'
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'edit',
    story: 'updated the contact',
    data: {
      changes: [
        { action: 'added', field: 'First Name', value: 'Greg' },
        { action: 'changed', field: 'Last Name', was: 'Kopf', value: 'Kops' }
      ]
    }
  })

  await activity(req, {
    story: 'updated {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  await contact.load(['photo'], {
    transacting: req.trx
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default updateRoute
