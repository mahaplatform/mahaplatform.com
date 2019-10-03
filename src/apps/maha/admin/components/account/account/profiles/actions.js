export const fetch = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const revoke = (id) => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: `/api/admin/profiles/${id}`,
  request: 'REVOKE_REQUEST',
  success: 'REVOKE_SUCCESS',
  failure: 'REVOKE_FAILURE'
})
