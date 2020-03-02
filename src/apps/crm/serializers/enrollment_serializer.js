const EnrollmentSerializer = (req, result) => ({
  id: result.get('id'),
  contact: contact(result.related('contact')),
  actions: result.related('actions').map(action),
  was_converted: result.get('was_converted'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

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

const action = (action) => {
  if(!action.id) return null
  return {
    id: action.get('id'),
    step: step(action.related('step')),
    created_at: action.get('created_at')
  }
}

const step = (step) => {
  if(!step.id) return null
  return {
    id: step.get('id'),
    action: step.get('action'),
    config: step.get('config')
  }
}

export default EnrollmentSerializer
