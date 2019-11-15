export const submit = (token, data, mandate) => ({
  type: 'BRAINTREE_REQUEST',
  method: 'ach',
  token,
  data,
  mandate,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
