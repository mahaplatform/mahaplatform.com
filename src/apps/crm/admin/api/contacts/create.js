import { updateMailingAddresses } from '../../../services/mailing_addresses'
import { activity } from '@core/services/routes/activities'
import { updateEmailAddresses } from '../../../services/email_addresses'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '@core/services/routes/params'
import { updatePhoneNumbers } from '../../../services/phone_numbers'
import generateCode from '@core/utils/generate_code'
import { processValues } from '../../../../maha/services/values'
import socket from '@core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import { updateTopics } from '../../../services/topics'
import { updateLists } from '../../../services/lists'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'

const createRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const values = await processValues(req, {
    parent_type: 'crm_programs',
    values: req.body.values
  })

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['first_name','last_name','organization','position','photo_id','birthday','spouse']),
    values
  }).save(null, {
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

  if(req.body.list_ids) {
    await updateLists(req, {
      contact,
      list_ids: req.body.list_ids
    })
  }

  if(req.body.topic_ids) {
    await updateTopics(req, {
      contact,
      topic_ids: req.body.topic_ids
    })
  }

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'edit',
    story: 'created the contact',
    data: {
      changes: [
        { action: 'added', field: 'First Name', value: contact.get('first_name') },
        { action: 'added', field: 'Last Name', value: contact.get('last_name') },
        { action: 'added', field: 'Email', value: contact.get('email') },
        { action: 'added', field: 'Phone', value: contact.get('phone') }
      ]
    }
  })

  await activity(req, {
    story: 'created {object}',
    object: contact
  })

  await socket.refresh(req, [
    '/admin/crm/contacts'
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

export default createRoute
