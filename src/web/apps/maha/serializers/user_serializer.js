const userSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  photo: result.related('photo').get('path'),
  is_active: result.get('is_active')
})

export default userSerializer
