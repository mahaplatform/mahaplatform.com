export const authorize = (token, data) => ({
  type: 'APPLEPAY_REQUEST',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const submit = (token, code, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/crm/forms/${code}`,
  body,
  token,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
