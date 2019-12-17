export const authorize = (token, data, mandate) => ({
  type: 'ACH_REQUEST',
  token,
  data,
  mandate,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})
