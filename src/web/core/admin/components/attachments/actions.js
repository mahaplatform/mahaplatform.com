export const fetch = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  query: {
    $filter: {
      type: {
        $in: types
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const create = (endpoint, body, index) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body,
  meta: { index },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})

export const add = (file) => ({
  type: 'ADD',
  file
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const update = (index, data) => ({
  type: 'UPDATE',
  index,
  data
})
