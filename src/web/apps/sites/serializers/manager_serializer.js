const typeSerializer = (req, result) => ({
  id: result.get('id'),
  user: user(result.related('user')),
  role: result.get('role'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {

  if(!user.id) return null

  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }

}

export default typeSerializer
