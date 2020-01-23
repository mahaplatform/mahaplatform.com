export const set = (link_id) => ({
  type: 'SET',
  link_id
})

export const remove = () => ({
  type: 'REMOVE'
})

export const fetch = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  query: { url },
  endpoint: '/api/admin/links/preview',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
