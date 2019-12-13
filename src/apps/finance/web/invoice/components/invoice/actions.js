export const fetch = (code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/finance/invoices/${code}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const submit = (code, nonce) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/finance/invoices/${code}/payment`,
  body: { nonce },
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
