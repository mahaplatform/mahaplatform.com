import { updateRelated } from '../../../../../core/services/routes/relations'
import { updateMailingAddresses } from '../../../services/mailing_addresses'
import { activity } from '../../../../../core/services/routes/activities'
import { updateEmailAddresses } from '../../../services/email_addresses'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { updatePhoneNumbers } from '../../../services/phone_numbers'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import { getChanges } from '../../../services/contacts'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const updateRoute = async (req, res) => {

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const contact = await Contact.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email_addresses','mailing_addresses','phone_numbers'],
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const values = await processValues(req, {
    parent_type: 'crm_programs',
    values: req.body.values
  })

  await contact.save({
    ...whitelist(req.body, ['first_name','last_name','photo_id']),
    values: {
      ...contact.get('values'),
      ...values
    }
  }, {
    transacting: req.trx
  })

  await updateEmailAddresses(req, {
    contact,
    email_addresses: req.body.email_addresses
  })

  await updatePhoneNumbers(req, {
    contact,
    phone_numbers: req.body.phone_numbers
  })

  await updateMailingAddresses(req, {
    contact,
    mailing_addresses: req.body.mailing_addresses
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

  await updateRelated(req, {
    object: contact,
    related: 'topics',
    table: 'crm_interests',
    ids: req.body.topic_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'topic_id'
  })

  await updateRelated(req, {
    object: contact,
    related: 'lists',
    table: 'crm_subscriptions',
    ids: req.body.list_ids,
    foreign_key: 'contact_id',
    related_foreign_key: 'list_id'
  })

  const changes = getChanges(req, { contact })

  if(changes.length > 0) {
    await contactActivity(req, {
      user: req.user,
      contact,
      type: 'edit',
      story: 'updated the contact',
      data: { changes }
    })
  }

  await activity(req, {
    story: 'updated {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts',
    `/admin/crm/contacts/${contact.get('id')}`
  ])

  const _contact = await Contact.query(qb => {
    qb.select('crm_contacts.*','crm_contact_primaries.*')
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('id', contact.get('id'))
  }).fetch({
    withRelated: ['email_addresses','mailing_addresses','organizations','phone_numbers','photo','tags'],
    transacting: req.trx
  })
  
  res.status(200).respond(_contact, ContactSerializer)

}

export default updateRoute
