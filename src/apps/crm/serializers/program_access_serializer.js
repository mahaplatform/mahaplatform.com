const ProgramAccessSerializer = (req, result) => ({
  id: result.get('id'),
  ...grouping(result.related('grouping')),
  ...user(result.related('user')),
  ...group(result.related('group')),
  grouping_id: result.get('grouping_id'),
  user_id: result.get('user_id'),
  group_id: result.get('group_id'),
  type: result.get('type')
})

const grouping = (grouping) => {
  if(!grouping.id) return {}
  return {
    full_name: grouping.get('title')
  }
}

const group = (group) => {
  if(!group.id) return {}
  return {
    full_name: group.get('title')
  }
}

const user = (user) => {
  if(!user.id) return {}
  return {
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default ProgramAccessSerializer
