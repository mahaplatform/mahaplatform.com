export const lookup = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assets/url',
  query: { url },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})
