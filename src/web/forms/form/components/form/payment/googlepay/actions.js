export const submit = (token, data) => ({
  type: 'GOOGLEPAY_REQUEST',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
