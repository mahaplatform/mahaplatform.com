export const authorize = (token, data) => ({
  type: 'CARD_REQUEST',
  token,
  data,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})
