export const fetch = (code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/finance/invoices/${code}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
