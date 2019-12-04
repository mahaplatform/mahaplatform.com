export const fetch = (endpoint, defaults) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  meta: { defaults },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const submitForm = (method, endpoint, body) => ({
  type: 'API_REQUEST',
  method,
  body,
  endpoint,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const setData = (data) => ({
  type: 'SET_DATA',
  data
})

export const setReady = (field) => ({
  type: 'SET_READY',
  field
})

export const setBusy = (field, value) => ({
  type: 'SET_BUSY' ,
  field,
  value
})

export const updateData = (key, value) => ({
  type: 'UPDATE_DATA',
  key,
  value
})


export const validateForm = (validateResults) => ({
  type: 'VALIDATE_FORM',
  validateResults
})
