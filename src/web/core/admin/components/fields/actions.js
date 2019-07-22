export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const reorder = (endpoint, from, to) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `${endpoint}/reorder`,
  body: { from, to },
  request: 'REORDER_REQUEST',
  success: 'REORDER_SUCCESS',
  failure: 'REORDER_FAILURE'
})

export const move = (from, to) => ({
  type: 'MOVE',
  from,
  to
})
