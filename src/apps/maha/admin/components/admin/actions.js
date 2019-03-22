export const loadAdmin = () => ({
  type: 'LOCAL_GET',
  key: 'admin',
  request: 'LOAD_ADMIN_REQUEST',
  success: 'LOAD_ADMIN_SUCCESS',
  failure: 'LOAD_ADMIN_FAILURE'
})

export const saveAdmin = (active, teams) => ({
  type: 'LOCAL_SET',
  key: 'admin',
  value: {
    active,
    teams
  },
  request: 'SAVE_ADMIN_REQUEST',
  success: 'SAVE_ADMIN_SUCCESS',
  failure: 'SAVE_ADMIN_FAILURE'
})

export const loadSession = (token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/session',
  token,
  request: 'LOAD_SESSION_REQUEST',
  success: 'LOAD_SESSION_SUCCESS',
  failure: 'LOAD_SESSION_FAILURE'
})

export const addTeam = (team, token, user) => ({
  type: 'ADD_TEAM',
  team,
  token,
  user
})

export const removeTeam = (index) => ({
  type: 'REMOVE_TEAM',
  index
})

export const signin = (index, token) => ({
  type: 'SIGNIN',
  index,
  token
})

export const signout = (index) => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: '/api/admin/session',
  request: 'SIGNOUT_REQUEST',
  success: 'SIGNOUT_SUCCESS',
  failure: 'SIGNOUT_FAILURE'
})

export const chooseTeam = (index) => ({
  type: 'CHOOSE_TEAM',
  index
})

export const removeSession = () => ({
  type: 'REMOVE_SESSION'
})

export const updateSession = (session) => ({
  type: 'UPDATE_SESSION',
  session
})
