import { expandValues } from '../../maha/services/values'

const ContactSerializer = async (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  display_name: result.get('display_name'),
  full_name: result.get('full_name'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  initials: result.get('initials'),
  email_id: result.get('email_id'),
  email: result.get('email'),
  rfc822: result.get('rfc822'),
  phone: result.get('phone'),
  phone_id: result.get('phone_id'),
  address: result.get('address'),
  address_id: result.get('address_id'),
  organization: result.get('organization'),
  position: result.get('position'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  lists: result.related('lists').map(list),
  topics: result.related('topics').map(topic),
  values: await values(req, result.get('values')),
  birthday: result.get('birthday'),
  spouse: result.get('spouse'),
  mailing_addresses: result.related('mailing_addresses').map(mailing_address),
  phone_numbers: result.related('phone_numbers').map(phone_number),
  email_addresses: result.related('email_addresses').map(email_address),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const email_address = (email_address) => {
  if(!email_address.id) return null
  return {
    id: email_address.get('id'),
    address: email_address.get('address'),
    was_hard_bounced: email_address.get('was_hard_bounced'),
    soft_bounce_count: email_address.get('soft_bounce_count'),
    is_valid: email_address.get('is_valid'),
    is_primary: email_address.get('is_primary')
  }
}

const mailing_address = (mailing_address) => {
  if(!mailing_address.id) return null
  return {
    id: mailing_address.get('id'),
    address: mailing_address.get('address'),
    is_primary: mailing_address.get('is_primary')
  }
}

const phone_number = (phone_number) => {
  if(!phone_number.id) return null
  return {
    id: phone_number.get('id'),
    number: phone_number.get('number'),
    formatted: phone_number.get('formatted'),
    undelivered_count: phone_number.get('undelivered_count'),
    can_text: phone_number.get('can_text'),
    is_primary: phone_number.get('is_primary')
  }
}

const list = (list) => {
  if(!list.id) return null
  return {
    id: list.get('id'),
    program_id: list.get('program_id'),
    title: list.get('title')
  }
}

const topic = (topic) => {
  if(!topic.id) return null
  return {
    id: topic.get('id'),
    program_id: topic.get('program_id'),
    title: topic.get('title')
  }
}

const values = async (req, values) => {
  if(!values || !req.fields) return {}
  return await expandValues(req, {
    parent_type: 'crm_programs',
    data: values
  })
}

export default ContactSerializer
