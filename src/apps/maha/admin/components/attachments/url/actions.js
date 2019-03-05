export const lookup = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assets/url',
  query: { url },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})

export const importAsset = (url) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/assets/url',
  body: { url },
  request: 'IMPORT_REQUEST',
  success: 'IMPORT_SUCCESS',
  failure: 'IMPORT_FAILURE'
})
