const RegistrationSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  invoice_id: result.get('invoice_id'),
  ipaddress: result.get('ipaddress'),
  referer: result.get('referer'),
  duration: result.get('duration'),
  is_known: result.get('is_known'),
  tickets_count: result.get('tickets_count'),
  revenue: result.get('revenue'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default RegistrationSerializer
