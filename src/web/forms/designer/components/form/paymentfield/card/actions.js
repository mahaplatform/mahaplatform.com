export const submit = (token, data) => ({
  type: 'BRAINTREE_REQUEST',
  endpoint: 'payment_methods/credit_cards',
  method: 'post',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})
