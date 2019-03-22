export const setAssigned = (assigned) => ({
  type: 'SET_ASSIGNED',
  assigned
})

export const toggleApp = (app_id) => ({
  type: 'TOGGLE_APP',
  app_id
})

export const toggleRight = (right_id) => ({
  type: 'TOGGLE_RIGHT',
  right_id
})

export const load = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/team/access',
  request: 'LOAD_REQUEST',
  success: 'LOAD_SUCCESS',
  failure: 'LOAD_FAILURE'
})

export const submit = (endpoint, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
