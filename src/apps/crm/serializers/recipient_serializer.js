const RecipientSerializer = (req, result) => ({
  contact: contact(result.related('contact')),
  email_address: email_address(result.related('email_address')),
  mailing_address: mailing_address(result.related('mailing_address')),
  phone_number: phone_number(result.related('phone_number'))
})

const contact = (contact) => {
  if(!contact.id) return
  return {
    id: contact.get('id'),
    full_name: contact.get('full_name'),
    initials: contact.get('initials'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

const email_address = (email_address) => {
  if(!email_address.id) return
  return {
    id: email_address.get('id'),
    address: email_address.get('address')
  }
}

const mailing_address = (mailing_address) => {
  if(!mailing_address.id) return
  return {
    id: mailing_address.get('id'),
    street: mailing_address.get('street'),
    city: mailing_address.get('city'),
    state_province: mailing_address.get('state_province'),
    postal_code: mailing_address.get('postal_code'),
    county: mailing_address.get('county')
  }
}

const phone_number = (phone_number) => {
  if(!phone_number.id) return
  return {
    id: phone_number.get('id'),
    number: phone_number.get('number')
  }
}

export default RecipientSerializer
