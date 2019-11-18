export const submit = (token, data) => ({
  type: 'BRAINTREE_REQUEST',
  method: 'card',
  token,
  data,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
