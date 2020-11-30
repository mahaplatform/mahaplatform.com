export const loadAccount = () => ({
  type: 'LOCAL_GET',
  key: 'account',
  request: 'LOAD_ACCOUNT_REQUEST',
  success: 'LOAD_ACCOUNT_SUCCESS',
  failure: 'LOAD_ACCOUNT_FAILURE'
})

export const saveAccount = (account) => ({
  type: 'LOCAL_SET',
  key: 'account',
  value: {
    account
  },
  request: 'SAVE_ACCOUNT_REQUEST',
  success: 'SAVE_ACCOUNT_SUCCESS',
  failure: 'SAVE_ACCOUNT_FAILURE'
})

export const loadActive = () => ({
  type: 'LOCAL_GET',
  key: 'active',
  request: 'LOAD_ACTIVE_REQUEST',
  success: 'LOAD_ACTIVE_SUCCESS',
  failure: 'LOAD_ACTIVE_FAILURE'
})

export const saveActive = (active) => ({
  type: 'LOCAL_SET',
  key: 'active',
  value: active,
  request: 'SAVE_ACTIVE_REQUEST',
  success: 'SAVE_ACTIVE_SUCCESS',
  failure: 'SAVE_ACTIVE_FAILURE'
})

export const fetchAccount = (token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/signin/account',
  token,
  request: 'FETCH_ACCOUNT_REQUEST',
  success: 'FETCH_ACCOUNT_SUCCESS',
  failure: 'FETCH_ACCOUNT_FAILURE'
})

export const fetchTeams = (token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/signin/teams',
  token,
  request: 'FETCH_TEAMS_REQUEST',
  success: 'FETCH_TEAMS_SUCCESS',
  failure: 'FETCH_TEAMS_FAILURE'
})

export const fetchSession = (active, token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/session',
  meta: { active },
  token,
  request: 'FETCH_SESSION_REQUEST',
  success: 'FETCH_SESSION_SUCCESS',
  failure: 'FETCH_SESSION_FAILURE'
})

export const signin = (account) => ({
  type: 'SIGNIN',
  account
})

export const signout = () => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: '/api/admin/session',
  request: 'SIGNOUT_REQUEST',
  success: 'SIGNOUT_SUCCESS',
  failure: 'SIGNOUT_FAILURE'
})

export const chooseTeam = (index, redirect) => ({
  type: 'CHOOSE_TEAM',
  index,
  redirect
})

export const setRedirect = (redirect) => ({
  type: 'SET_REDIRECT',
  redirect
})
