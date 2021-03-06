const EmailActivitySerializer = (req, result) => ({
  id: result.get('id'),
  email: email(result.related('email')),
  contact: contact(result.related('email').related('contact')),
  description: result.get('description'),
  icon: result.get('icon'),
  forwarded_to: result.get('forwarded_to'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const email = (email) => {
  if(!contact) return null
  return {
    id: email.get('id'),
    code: email.get('code')
  }
}

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    rfc822: contact.get('rfc822'),
    initials: contact.get('initials'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default EmailActivitySerializer
