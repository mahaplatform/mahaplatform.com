export const loadAccount = () => ({
  type: 'LOCAL_GET',
  key: 'account',
  request: 'LOAD_ACCOUNT_REQUEST',
  success: 'LOAD_ACCOUNT_SUCCESS',
  failure: 'LOAD_ACCOUNT_FAILURE'
})

export const saveAccount = (active, account) => ({
  type: 'LOCAL_SET',
  key: 'account',
  value: {
    active,
    account
  },
  request: 'SAVE_ACCOUNT_REQUEST',
  success: 'SAVE_ACCOUNT_SUCCESS',
  failure: 'SAVE_ACCOUNT_FAILURE'
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

export const signout = () => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: '/api/admin/session',
  request: 'SIGNOUT_REQUEST',
  success: 'SIGNOUT_SUCCESS',
  failure: 'SIGNOUT_FAILURE'
})

export const signin = (account) => ({
  type: 'SIGNIN',
  account
})

export const chooseTeam = (index) => ({
  type: 'CHOOSE_TEAM',
  index
})
