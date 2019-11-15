export const submit = (token, data) => ({
  type: 'BRAINTREE_REQUEST',
  method: 'google',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
