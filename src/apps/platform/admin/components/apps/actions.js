export const setAssigned = (assigned) => ({
  type: 'SET_ASSIGNED',
  assigned
})

export const toggleApp = (app_id) => ({
  type: 'TOGGLE_APP',
  app_id
})

export const fetch = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/platform/apps',
  query: {
    $filter: {
      id: {
        $neq: 1
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
