const assigningSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  assigned_by: user(result.related('assigned_by')),
  completed_by: result.get('completed_by'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

export default assigningSerializer
