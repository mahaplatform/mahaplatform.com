export const close = () => ({
  type: 'CLOSE'
})

export const type = (q) => ({
  type: 'TYPE',
  q
})

export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/help/${id}`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
