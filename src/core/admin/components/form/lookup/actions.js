export const load = (endpoint, $filter) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query: { $filter },
  request: 'LOAD_REQUEST',
  success: 'LOAD_SUCCESS',
  failure: 'LOAD_FAILURE'
})

export const choose = (chosen) => ({
  type: 'CHOOSE',
  chosen
})

export const clear = () => ({
  type: 'CLEAR'
})
