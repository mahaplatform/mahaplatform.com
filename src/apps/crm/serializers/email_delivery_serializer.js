const EmailDeliverySerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  bounce_type: result.get('bounce_type'),
  bounce_subtype: result.get('bounce_subtype'),
  sent_at: result.get('sent_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    rfc822: contact.get('rfc822'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default EmailDeliverySerializer
