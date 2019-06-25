const memberSerializer = (req, result) => ({
  id: result.get('id'),
  user: user(result.related('user')),
  project: project(result.related('project')),
  member_type_id: result.get('member_type_id')
})

const user = (user) => {

  if(!user) return null

  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path'),
    email: user.get('email'),
    is_active: user.get('is_active')
  }

}

const project = (project) => {

  if(!project) return null

  return {
    id: project.get('id'),
    title: project.get('title'),
    is_active: project.get('is_active'),
    integration: project.get('integration')
  }

}

export default memberSerializer
