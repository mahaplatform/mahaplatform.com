const supervisorSerializer = (req, result) => ({
  id: result.get('id'),
  user_id: result.get('user_id'),
  full_name: result.related('user').get('full_name'),
  initials: result.related('user').get('initials'),
  email: result.related('user').get('email'),
  photo: result.related('user').related('photo').get('path')
})

export default supervisorSerializer
