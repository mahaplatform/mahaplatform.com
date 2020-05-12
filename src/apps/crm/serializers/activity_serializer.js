const ActivitySerializer = (req, result) => ({
  id: result.get('id'),
  type: result.get('type'),
  program: program(result.related('program')),
  contact: contact(result.related('contact')),
  user: user(result.related('user')),
  story: result.related('story').get('text'),
  data: result.get('data'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const contact = (contact) => {
  if(!contact.id) return null
  return {
    id: contact.get('id'),
    display_name: contact.get('display_name')
  }
}

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default ActivitySerializer
