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
import { updateTopics } from '../../../services/topics'
import { updateLists } from '../../../services/lists'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const updateRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    ...whitelist(req.body, ['first_name','last_name','organization','position','photo_id','birthday','spouse']),
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

  await updateLists(req, {
    contact,
    list_ids: req.body.list_ids
  })

  await updateTopics(req, {
    contact,
    topic_ids: req.body.topic_ids
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
    withRelated: ['email_addresses','mailing_addresses','phone_numbers','photo'],
    transacting: req.trx
  })

  res.status(200).respond(_contact, ContactSerializer)

}

export default updateRoute
