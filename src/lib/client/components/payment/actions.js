export const fetch = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/finance/payments/token',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const setMethod = (method) => ({
  type: 'SET_METHOD',
  method
})
