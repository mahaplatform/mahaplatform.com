const EnrollmentSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  was_converted: result.get('was_converted'),
  status: result.get('status'),
  completed_at: result.get('completed_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    rfc822: contact.get('rfc822'),
    phone_name: contact.get('phone_name'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default EnrollmentSerializer
