export const check = (service) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/sources/${service}`,
  request: 'CHECK_REQUEST',
  success: 'CHECK_SUCCESS',
  failure: 'CHECK_FAILURE'
})

export const authorized = (profile) => ({
  type: 'AUTHORIZED',
  profile
})
