export const fetchLink = (url) => ({
  type: 'API_REQUEST',
  method: 'POST',
  body: { url },
  endpoint: '/api/admin/links',
  request: 'FETCH_LINK_REQUEST',
  success: 'FETCH_LINK_SUCCESS',
  failure: 'FETCH_LINK_FAILURE'
})

export const removeLink = () => ({
  type: 'REMOVE_LINK'
})
