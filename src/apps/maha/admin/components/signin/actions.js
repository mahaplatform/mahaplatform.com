export const team = (subdomain) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/team',
  body: { subdomain },
  request: 'TEAM_REQUEST',
  success: 'TEAM_SUCCESS',
  failure: 'TEAM_FAILURE'
})

export const email = (team_id, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/email',
  body: { team_id, email },
  request: 'EMAIL_REQUEST',
  success: 'EMAIL_SUCCESS',
  failure: 'EMAIL_FAILURE'
})

export const password = (team_id, email, password) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/password',
  body: { team_id, email, password },
  request: 'PASSWORD_REQUEST',
  success: 'PASSWORD_SUCCESS',
  failure: 'PASSWORD_FAILURE'
})

export const forgot = (team_id, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/reset/email',
  body: { team_id, email },
  request: 'FORGOT_REQUEST',
  success: 'FORGOT_SUCCESS',
  failure: 'FORGOT_FAILURE'
})

export const lockout = (team_id, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/signin/lockout',
  body: { team_id, email },
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

export const set = (team, user, mode) => ({
  type: 'SET',
  team,
  user,
  mode
})
