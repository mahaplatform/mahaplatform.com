export const fetch= (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  query: {
    $filter: {
      type: {
        $in: ['contacts']
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
