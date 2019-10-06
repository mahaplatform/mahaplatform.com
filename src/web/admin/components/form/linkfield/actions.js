export const fetch = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/links/preview',
  query: { url },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
