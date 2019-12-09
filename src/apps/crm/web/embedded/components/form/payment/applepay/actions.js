export const submit = (token, data) => ({
  type: 'APPLEPAY_REQUEST',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
