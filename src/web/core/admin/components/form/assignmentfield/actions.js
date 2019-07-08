export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assignees',
  query: {
    $page: {
      limit: 0
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
