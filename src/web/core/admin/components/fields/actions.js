export const fetch = (parent_type, parent_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/${parent_type}/${parent_id}/fields`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const reorder = (parent_type, parent_id, from, to) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/${parent_type}/${parent_id}/fields/reorder`,
  body: { from, to },
  request: 'REORDER_REQUEST',
  success: 'REORDER_SUCCESS',
  failure: 'REORDER_FAILURE'
})

export const move = (from, to) => ({
  type: 'MOVE',
  from,
  to
})
