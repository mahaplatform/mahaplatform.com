export const fetch = (ids) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/assets',
  query: {
    $filter: {
      id: {
        $in: ids
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const add = (images) => ({
  type: 'ADD',
  images
})

export const set = (images) => ({
  type: 'SET',
  images
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const move = (from, to) => ({
  type: 'MOVE',
  from,
  to
})
