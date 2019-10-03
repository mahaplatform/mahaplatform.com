export const fetch = (code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/${code}/filters`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const choose = (id) => ({
  type: 'CHOOSE',
  id
})
