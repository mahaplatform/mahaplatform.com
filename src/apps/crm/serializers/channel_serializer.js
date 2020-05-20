const ChannelSerializer = (req, result) => ({
  type: result.get('type'),
  id: result.get(result.get('key')),
  label: result.get('label'),
  email_address: email_address(result.related('email_address')),
  mailing_address: mailing_address(result.related('mailing_address')),
  phone_number: phone_number(result.related('phone_number')),
  optedin_at: result.get('optedin_at'),
  optedout_at: result.get('optedout_at'),
  optin_reason: result.get('optin_reason'),
  optout_reason: result.get('optout_reason'),
  optout_reason_other: result.get('optout_reason_other'),
  code: result.get('code'),
  has_consented: result.get('has_consented')
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

export default ChannelSerializer
