const EnrollmentSerializer = (req, result) => ({
  id: result.get('id'),
  call: call(result.related('call')),
  contact: contact(result.related('contact')),
  actions: result.get('result').actions,
  was_converted: result.get('was_converted'),
  status: result.get('status'),
  unenrolled_at: result.get('unenrolled_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const call = (call) => {
  if(!call.id) return null
  return {
    id: call.get('id'),
    duration: call.get('duration')
  }
}

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name'),
    initials: contact.get('initials'),
    email: contact.get('email'),
    photo: contact.related('photo') ? contact.related('photo').get('path') : null
  }
}

export default EnrollmentSerializer
