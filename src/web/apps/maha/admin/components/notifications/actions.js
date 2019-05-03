export const markSeen = (ids) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: '/api/admin/notifications/seen',
  body: { ids },
  request: 'MARK_SEEN_REQUEST',
  success: 'MARK_SEEN_SUCCESS',
  failure: 'MARK_SEEN_FAILURE'
})

export const markVisited = (id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/notifications/${id}/visited`,
  request: 'MARK_VISITED_REQUEST',
  success: 'MARK_VISITED_SUCCESS',
  failure: 'MARK_VISITED_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const push = (code, notification) => ({
  type: 'PUSH',
  code,
  notification
})

export const remove= (code) => ({
  type: 'REMOVE',
  code
})
