const ResponseSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  data: result.get('data'),
  ipaddress: result.get('ipaddress'),
  invoice_id: result.get('invoice_id'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default ResponseSerializer
