const userSerializer = (req, result) => ({
  id: result.get('id'),
  account_id: result.get('account_id'),
  full_name: result.get('full_name'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  cell_phone: result.get('cell_phone'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  is_active: result.get('is_active')
})

export default userSerializer
