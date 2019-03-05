export const verify = (token) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/activate/verify',
  body: { token },
  request: 'VERIFY_REQUEST',
  success: 'VERIFY_SUCCESS',
  failure: 'VERIFY_FAILURE'
})

export const security = (token, security_question_id, security_question_answer) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/activate/security',
  body: { token, security_question_id, security_question_answer },
  request: 'SECURITY_REQUEST',
  success: 'SECURITY_SUCCESS',
  failure: 'SECURITY_FAILURE'
})

export const password = (token, password, confirmation) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/activate/password',
  body: { token, password, confirmation },
  request: 'PASSWORD_REQUEST',
  success: 'PASSWORD_SUCCESS',
  failure: 'PASSWORD_FAILURE'
})

export const avatar = (token, photo_id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/activate/avatar',
  body: { token, photo_id },
  request: 'AVATAR_REQUEST',
  success: 'AVATAR_SUCCESS',
  failure: 'AVATAR_FAILURE'
})

export const notifications = (token, email_notifications_method) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/activate/notifications',
  body: { token, email_notifications_method },
  request: 'NOTIFICATIONS_REQUEST',
  success: 'NOTIFICATIONS_SUCCESS',
  failure: 'NOTIFICATIONS_FAILURE'
})

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const chooseQuestion = (id) => ({
  type: 'CHOOSE_QUESTION',
  id
})

export const togglePassword = () => ({
  type: 'TOGGLE_PASSWORD'
})

export const setPhotoId = (id) => ({
  type: 'SET_PHOTO_ID',
  id
})
