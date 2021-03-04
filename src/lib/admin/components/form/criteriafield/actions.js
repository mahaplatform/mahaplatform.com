export const fetch = (endpoint,  $filter) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query: { $filter, $page: { limit: 1 } },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const set = (criteria) => ({
  type: 'SET',
  criteria
})
