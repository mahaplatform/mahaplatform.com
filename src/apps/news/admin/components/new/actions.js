export const save = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/news/posts',
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})
