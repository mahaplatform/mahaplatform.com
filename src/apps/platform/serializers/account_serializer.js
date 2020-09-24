const accountSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  cell_phone: result.get('cell_phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  is_blocked: result.get('is_blocked'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default accountSerializer
