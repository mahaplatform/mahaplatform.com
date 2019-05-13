export const fetchProfiles = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  request: 'FETCH_PROFILES_REQUEST',
  success: 'FETCH_PROFILES_SUCCESS',
  failure: 'FETCH_PROFILES_FAILURE'
})

export const fetchSources = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/sources',
  request: 'FETCH_SOURCES_REQUEST',
  success: 'FETCH_SOURCES_SUCCESS',
  failure: 'FETCH_SOURCES_FAILURE'
})

export const authorize = (service) => ({
  type: 'API_REQUEST',
  method: 'GET',
  meta: { service },
  endpoint: `/api/admin/sources/${service}/authorize`,
  request: 'AUTHORIZE_REQUEST',
  success: 'AUTHORIZE_SUCCESS',
  failure: 'AUTHORIZE_FAILURE'
})

export const revoke = (id) => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: `/api/admin/profiles/${id}`,
  request: 'REVOKE_REQUEST',
  success: 'REVOKE_SUCCESS',
  failure: 'REVOKE_FAILURE'
})

export const authorized = () => ({
  type: 'AUTHORIZED'
})
