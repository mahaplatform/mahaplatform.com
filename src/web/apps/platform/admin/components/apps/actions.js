export const setAssigned = (assigned) => ({
  type: 'SET_ASSIGNED',
  assigned
})

export const toggleApp = (app_id) => ({
  type: 'TOGGLE_APP',
  app_id
})

export const fetch = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/platform/teams/apps',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
