export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/learning/quizes/${id}/questions`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const reorder = (id, from, to) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/learning/quizes/${id}/questions/reorder`,
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
