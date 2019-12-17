export const authorize = (token, data) => ({
  type: 'ACH_REQUEST',
  token,
  data,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})
