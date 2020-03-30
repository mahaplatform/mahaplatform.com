export const fetchUnassigned = (endpoint, filter) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  query: {
    $filter: filter || null,
    $page: {
      limit: 0
    }
  },
  request: 'FETCH_UNASSIGNED_REQUEST',
  success: 'FETCH_UNASSIGNED_SUCCESS',
  failure: 'FETCH_UNASSIGNED_FAILURE'
})

export const fetchAssigned = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_ASSIGNED_REQUEST',
  success: 'FETCH_ASSIGNED_SUCCESS',
  failure: 'FETCH_ASSIGNED_FAILURE'
})

export const save = (endpoint, assignments) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint,
  body: { assignments },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const query = (q) => ({
  type: 'QUERY',
  q
})

export const beginAdd = () => ({
  type: 'BEGIN_ADD'
})

export const add = (assignee) => ({
  type: 'ADD',
  assignee
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const setAssigned = (assigned) => ({
  type: 'SET_ASSIGNED',
  assigned
})

export const setTypes = (types) => ({
  type: 'SET_TYPES',
  types
})

export const changeType = (name, index) => ({
  type: 'CHANGE_TYPE',
  name,
  index
})
