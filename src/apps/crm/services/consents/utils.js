import MailingAddress from '@apps/crm/models/mailing_address'
import EmailAddress from '@apps/crm/models/email_address'
import PhoneNumber from '@apps/crm/models/phone_number'

const getEmail = async(req, { contact, value }) => {
  return EmailAddress.query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('address', value)
  }).fetch({
    transacting: req.trx
  })
}

const getPhone = async(req, { contact, value }) => {
  return PhoneNumber.query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('number', value)
  }).fetch({
    transacting: req.trx
  })
}

const getAddress = async(req, { contact, value }) => {
  return MailingAddress.query(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.whereRaw('address->\'description\'', value)
  }).fetch({
    transacting: req.trx
  })
}

export const getKey = (type) => {
  if(type === 'email') return 'email_address_id'
  if(type === 'sms') return 'phone_number_id'
  if(type === 'voice') return 'phone_number_id'
  if(type === 'mail') return 'mailing_address_id'
}

export const getChannel = async(req, { contact, type, value }) => {
  if(type === 'email') return await getEmail(req, { contact, value })
  if(type === 'voice') return await getPhone(req, { contact, value })
  if(type === 'sms') return await getPhone(req, { contact, value })
  if(type === 'address') return await getAddress(req, { contact, value })
}
