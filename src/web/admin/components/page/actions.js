export const fetchResource = (prop, endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  meta: { prop, endpoint },
  request: 'FETCH_RESOURCE_REQUEST',
  success: 'FETCH_RESOURCE_SUCCESS',
  failure: 'FETCH_RESOURCE_FAILURE'
})

export const clearResource = (prop) => ({
  type: 'CLEAR_RESOURCE',
  prop
})

export const ready = () => ({
  type: 'READY'
})
