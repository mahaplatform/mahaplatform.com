export const fetchProfiles = (url) => ({
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
  request: 'FETCH_PROFILES_REQUEST',
  success: 'FETCH_PROFILES_SUCCESS',
  failure: 'FETCH_PROFILES_FAILURE'
})
