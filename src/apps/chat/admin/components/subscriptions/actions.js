export const save = (endpoint, method, ids) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  body: { ids },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const set = (ids) => ({
  type: 'SET',
  ids
})
