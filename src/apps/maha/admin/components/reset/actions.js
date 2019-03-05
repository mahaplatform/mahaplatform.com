export const verify = (token) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/reset/verify',
  body: { token },
  request: 'VERIFY_REQUEST',
  success: 'VERIFY_SUCCESS',
  failure: 'VERIFY_FAILURE'
})

export const security = (token, answer) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/reset/security',
  body: { token, answer },
  request: 'SECURITY_REQUEST',
  success: 'SECURITY_SUCCESS',
  failure: 'SECURITY_FAILURE'
})

export const password = (token, password, confirmation) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/reset/password',
  body: { token, password, confirmation },
  request: 'PASSWORD_REQUEST',
  success: 'PASSWORD_SUCCESS',
  failure: 'PASSWORD_FAILURE'
})

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const togglePassword = () => ({
  type: 'TOGGLE_PASSWORD'
})
