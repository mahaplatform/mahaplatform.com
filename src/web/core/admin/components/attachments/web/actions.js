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

export const download = (url) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/assets/url',
  body: { url },
  request: 'DOWNLOAD_REQUEST',
  success: 'DOWNLOAD_SUCCESS',
  failure: 'DOWNLOAD_FAILURE'
})
