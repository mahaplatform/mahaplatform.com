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

export const add = (assignee) => ({
  type: 'ADD',
  assignee
})

export const query = (q) => ({
  type: 'QUERY',
  q
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (assignments) => ({
  type: 'SET',
  assignments
})
