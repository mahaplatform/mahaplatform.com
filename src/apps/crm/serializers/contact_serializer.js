import { expandValues } from '../../maha/services/values'
import _ from 'lodash'

const ContactSerializer = async (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  display_name: result.get('display_name'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  rfc822: result.get('rfc822'),
  phone: result.get('phone'),
  organization: result.get('organization'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  organizations: result.related('organizations').map(organization),
  lists: result.related('lists').map(list),
  topics: result.related('topics').map(topic),
  tags: result.related('tags').map(tag),
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
    is_primary: phone_number.get('is_primary')
  }
}

const organization = (organization) => {
  if(!organization.id) return null
  return {
    id: organization.get('id'),
    title: organization.get('title')
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

const tag = (tag) => {
  if(!tag.id) return null
  return {
    id: tag.get('id'),
    text: tag.get('text')
  }
}

const values = async (req, values) => {
  if(!values || !req.fields) return {}
  return await expandValues(req, 'crm_programs', null, values, false)
}

export default ContactSerializer
