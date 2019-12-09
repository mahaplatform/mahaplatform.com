export const submit = (token, data) => ({
  type: 'CARD_REQUEST',
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
