export const email = (email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/email',
  body: { email },
  request: 'EMAIL_REQUEST',
  success: 'EMAIL_SUCCESS',
  failure: 'EMAIL_FAILURE'
})

export const password = (email, password) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/password',
  body: { email, password },
  request: 'PASSWORD_REQUEST',
  success: 'PASSWORD_SUCCESS',
  failure: 'PASSWORD_FAILURE'
})

export const forgot = (email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/reset/email',
  body: { email },
  request: 'FORGOT_REQUEST',
  success: 'FORGOT_SUCCESS',
  failure: 'FORGOT_FAILURE'
})

export const lockout = (email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/lockout',
  body: { email },
  request: 'LOCKOUT_REQUEST',
  success: 'LOCKOUT_SUCCESS',
  failure: 'LOCKOUT_FAILURE'
})

export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const togglePassword = () => ({
  type: 'TOGGLE_PASSWORD'
})

export const toggleRemove = () => ({
  type: 'TOGGLE_REMOVE'
})

export const set = (user, mode) => ({
  type: 'SET',
  user,
  mode
})

export const setId = (signin_id) => ({
  type: 'SET_ID',
  signin_id
})
