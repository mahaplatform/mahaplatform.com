export const share = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/drive/share/chat',
  body,
  request: 'SHARE_REQUEST',
  success: 'SHARE_SUCCESS',
  failure: 'SHARE_FAILURE'
})

export const set = (ids) => ({
  type: 'SET',
  ids
})
