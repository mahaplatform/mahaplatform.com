export const fetchUnassigned = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assignees',
  query: {
    $filter: {
      is_active: {
        $eq: true
      }
    },
    $page: {
      limit: 0
    }
  },
  request: 'FETCH_UNASSIGNED_REQUEST',
  success: 'FETCH_UNASSIGNED_SUCCESS',
  failure: 'FETCH_UNASSIGNED_FAILURE'
})

export const fetchAssigned = (code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/drive/items/${code}/access`,
  request: 'FETCH_ASSIGNED_REQUEST',
  success: 'FETCH_ASSIGNED_SUCCESS',
  failure: 'FETCH_ASSIGNED_FAILURE'
})

export const save = (code, access) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/drive/items/${code}/access`,
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

export const update = (index, access_type_id) => ({
  type: 'UPDATE',
  index,
  access_type_id
})

export const revoke = (index) => ({
  type: 'REVOKE',
  index
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})
