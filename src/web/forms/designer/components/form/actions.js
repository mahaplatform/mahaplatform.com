export const save = (endpoint, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const change = (key, value) => ({
  type: 'CHANGE',
  key,
  value
})

export const setErrors = (errors) => ({
  type: 'SET_ERRORS',
  errors
})
