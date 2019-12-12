export const token = (code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/finance/invoices/${code}/token`,
  request: 'TOKEN_REQUEST',
  success: 'TOKEN_SUCCESS',
  failure: 'TOKEN_FAILURE'
})

export const pay = (code, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/finance/invoices/${code}/payments`,
  body,
  request: 'PAY_REQUEST',
  success: 'PAY_SUCCESS',
  failure: 'PAY_FAILURE'
})
