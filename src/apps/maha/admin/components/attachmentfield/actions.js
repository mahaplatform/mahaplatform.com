export const fetch = ($ids) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assets',
  query: { $ids },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (assets) => ({
  type: 'SET',
  assets
})
