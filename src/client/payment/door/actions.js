export const submit = (endpoint, token, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body,
  token,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
