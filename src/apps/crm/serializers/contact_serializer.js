const ContactSerializer = (req, result) => ({
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
  tags: result.related('tags').map(tag),
  values: values(req, result.get('values')),
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
    name: organization.get('name')
  }
}

const tag = (tag) => {
  if(!tag.id) return null
  return {
    id: tag.get('id'),
    text: tag.get('text')
  }
}

const values = (req, values) => {
  if(!values) return {}
  return Object.keys(values).reduce((sanitized, code) => {
    const field = req.fields.find(field => field.get('code') === code)
    const { multiple } = field.get('config')
    return {
      ...sanitized,
      [code]: multiple === true ? values[code] : values[code][0]
    }
  }, {})
}

export default ContactSerializer
