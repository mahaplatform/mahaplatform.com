export const submit = (code, nonce) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/finance/invoices/${code}/payment`,
  body: { nonce },
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
