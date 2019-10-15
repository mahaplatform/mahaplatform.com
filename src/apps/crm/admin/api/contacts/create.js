import { updateRelated } from '../../../../../core/services/routes/relations'
import { updateMailingAddresses } from '../../../services/mailing_addresses'
import { activity } from '../../../../../core/services/routes/activities'
import { updateEmailAddresses } from '../../../services/email_addresses'
import ContactSerializer from '../../../serializers/contact_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { updatePhoneNumbers } from '../../../services/phone_numbers'
import generateCode from '../../../../../core/utils/generate_code'
import { processValues } from '../../../../maha/services/values'
import socket from '../../../../../core/services/routes/emitter'
import { contactActivity } from '../../../services/activities'
import Field from '../../../../maha/models/field'
import Contact from '../../../models/contact'
const createRoute = async (req, res) => {

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'crm_contacts')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const values = await processValues(req, {
    parent_type: 'crm_contacts',
    values: req.body.values
  })

  const email = req.body.email_addresses.find(email => {
    return email.is_primary
  })

  const phone = req.body.phone_numbers.find(phone => {
    return phone.is_primary
  })

  const mailing = req.body.mailing_addresses.find(mailing_address => {
    return mailing_address.is_primary
  })

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    address: mailing ? mailing.address : null,
    email: email ? email.address : null,
    phone: phone ? phone.number : null,
    ...whitelist(req.body, ['first_name','last_name','photo_id']),
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

  await contact.load(['photo','tags'], {
    transacting: req.trx
  })

  res.status(200).respond(contact, ContactSerializer)

}

export default createRoute
