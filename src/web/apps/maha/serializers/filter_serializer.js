const filterSerializer = (req, result) => ({
  id: result.get('id'),
  owner: user(result.related('user')),
  title: result.get('title'),
  description: result.get('description'),
  code: result.get('code'),
  criteria: result.get('criteria'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user, key) => {
  if(!user) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default filterSerializer
