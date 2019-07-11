export const fetch = (quiz_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/training/trainings',
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const add = (ids) => ({
  type: 'ADD',
  ids
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const update = (index, ids) => ({
  type: 'UPDATE',
  index,
  ids
})
