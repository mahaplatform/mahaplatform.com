const ReactionSerializer = (req, result) => ({
  id: result.related('user').get('id'),
  full_name: result.related('user').get('full_name'),
  initials: result.related('user').get('initials'),
  photo: result.related('user').related('photo').get('path'),
  type: result.get('type'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default ReactionSerializer
