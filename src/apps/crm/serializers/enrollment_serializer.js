const EnrollmentSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  was_converted: result.get('was_converted'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    code: contact.get('code'),
    display_name: contact.get('display_name'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default EnrollmentSerializer
