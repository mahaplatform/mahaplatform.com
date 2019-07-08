const AssigneeSerializer = (req, result) => ({
  id: result.get('id'),
  is_everyone: result.get('is_everyone'),
  group: group(result.related('group')),
  user: user(result.related('user'))
})

const group = (group) => {
  if(!group.id) return null
  return {
    id: group.get('id'),
    title: group.get('title')
  }
}

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    is_active: user.get('is_active'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default AssigneeSerializer
