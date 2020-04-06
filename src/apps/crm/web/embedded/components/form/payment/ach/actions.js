export const authorize = (token, data, mandate) => ({
  type: 'ACH_REQUEST',
  token,
  data,
  mandate,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})

export const submit = (endpoint, token, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body,
  token,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
