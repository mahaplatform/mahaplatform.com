export const token = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/payments/token',
  request: 'TOKEN_REQUEST',
  success: 'TOKEN_SUCCESS',
  failure: 'TOKEN_FAILURE'
})

export const authorize = (token, data) => ({
  type: 'CARD_REQUEST',
  token,
  data,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})
