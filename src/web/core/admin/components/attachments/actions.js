export const fetch = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  query: {
    $filter: {
      type: {
        $in: ['files','photos']
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const create = (endpoint, file) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body: { id: file.id },
  meta: { file },
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
