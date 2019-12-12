export const submit = (token, total) => ({
  type: 'GOOGLEPAY_REQUEST',
  token,
  total,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
