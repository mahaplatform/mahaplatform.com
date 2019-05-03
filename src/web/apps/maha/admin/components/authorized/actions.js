export const check = (service) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/${service}/check`,
  request: 'CHECK_REQUEST',
  success: 'CHECK_SUCCESS',
  failure: 'CHECK_FAILURE'
})

export const authorize = (service, url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/${service}/authorize`,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})

export const authorized = () => ({
  type: 'AUTHORIZED'
})
