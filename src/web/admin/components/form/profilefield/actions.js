export const fetch = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  query: {
    $filter: {
      type: {
        $eq: 'posts'
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const choose = (index) => ({
  type: 'CHOOSE',
  index
})

export const clear = () => ({
  type: 'CLEAR'
})
