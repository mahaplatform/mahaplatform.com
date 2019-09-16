const profileSerializer = (req, result) => ({
  id: result.get('id'),
  service: result.related('source').get('text'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  profile_id: result.get('profile_id'),
  username: result.get('username'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default profileSerializer
