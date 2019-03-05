export const save = (endpoint, method, body) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const set = (ids) => ({
  type: 'SET',
  ids
})
