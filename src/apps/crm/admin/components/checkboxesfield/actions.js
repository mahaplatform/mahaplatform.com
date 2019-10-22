export const fetch = (endpoint, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (selected) => ({
  type: 'SET',
  selected
})

export const toggle = (id) => ({
  type: 'TOGGLE',
  id
})
