export const set = (selected) => ({
  type: 'SET',
  selected
})

export const load = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'LOAD_REQUEST',
  success: 'LOAD_SUCCESS',
  failure: 'LOAD_FAILURE'
})

export const toggle = (id) => ({
  type: 'TOGGLE',
  id
})
