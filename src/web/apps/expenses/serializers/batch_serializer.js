const BatchSerializer = (req, result) => ({
  id: result.get('id'),
  user: user(result.related('user')),
  integration: result.get('integration'),
  items_count: result.get('items_count'),
  total: result.get('total'),
  date: result.get('date'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(user.get('id')) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

export default BatchSerializer
