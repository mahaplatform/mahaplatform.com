import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const updateRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
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

  await contact.save({
    ...whitelist(req.body, ['first_name','last_name','email','phone','photo_id']),
    values
  }, {
    transacting: req.trx
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

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

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
