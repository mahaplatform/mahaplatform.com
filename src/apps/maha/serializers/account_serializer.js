const accountSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  photo: result.related('photo') ? result.related('photo').get('path') : null,
  authentication_strategy: result.get('authentication_strategy'),
  features: result.related('features').map(feature => feature.get('title')),
  use_twofactor: result.get('use_twofactor'),
  is_blocked: result.get('is_blocked'),
  locked_out_at: result.get('locked_out_at'),
  token: result.get('token'),
  preferences: result.get('preferences'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default accountSerializer
