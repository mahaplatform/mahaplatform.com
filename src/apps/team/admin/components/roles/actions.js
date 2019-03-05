export const setAssigned = (assigned) => ({
  type: 'SET_ASSIGNED',
  assigned
})

export const toggle = (index) => ({
  type: 'TOGGLE',
  index
})

export const load = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/team/roles',
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
  success: 'SUBMIT_SUBMIT',
  failure: 'SUBMIT_FAILURE'
})
