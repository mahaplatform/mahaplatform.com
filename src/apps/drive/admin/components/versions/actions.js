export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/drive/files/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
