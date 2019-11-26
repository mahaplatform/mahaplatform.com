export const fetch = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/payments/token',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const submit = (token, data) => ({
  type: 'CARD_REQUEST',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
