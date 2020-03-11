export const fetch = (endpoint, query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const clearSelection = () => ({
  type: 'CLEAR_SELECTION'
})

export const select = (id) => ({
  type: 'SELECT',
  id
})

export const selectAll = () => ({
  type: 'SELECT_ALL'
})
