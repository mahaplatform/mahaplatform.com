export const fetchUnassigned = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assignees',
  query: {
    $page: {
      limit: 0
    }
  },
  request: 'FETCH_UNASSIGNED_REQUEST',
  success: 'FETCH_UNASSIGNED_SUCCESS',
  failure: 'FETCH_UNASSIGNED_FAILURE'
})

export const fetchAssigned = (program_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/crm/programs/${program_id}/access`,
  request: 'FETCH_ASSIGNED_REQUEST',
  success: 'FETCH_ASSIGNED_SUCCESS',
  failure: 'FETCH_ASSIGNED_FAILURE'
})

export const save = (program_id, access) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/crm/programs/${program_id}/access`,
  body: { access },
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

export const update = (index, access_type) => ({
  type: 'UPDATE',
  index,
  access_type
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})
