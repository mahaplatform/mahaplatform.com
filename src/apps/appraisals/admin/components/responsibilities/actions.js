export const fetchTypes = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/appraisals/responsibility_types',
  request: 'FETCH_TYPES_REQUEST',
  success: 'FETCH_TYPES_SUCCESS',
  failure: 'FETCH_TYPES_FAILURE'
})

export const add = (responsibility) => ({
  type: 'ADD',
  responsibility
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (responsibilities) => ({
  type: 'SET',
  responsibilities
})

export const update = (index, key, value) => ({
  type: 'UPDATE',
  index,
  key,
  value
})
