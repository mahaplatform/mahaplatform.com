export const fetchData = (endpoint, defaults) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  meta: { defaults },
  request: 'FETCH_DATA_REQUEST',
  success: 'FETCH_DATA_SUCCESS',
  failure: 'FETCH_DATA_FAILURE'
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

export const submitForm = (method, endpoint, body) => ({
  type: 'API_REQUEST',
  method,
  body,
  endpoint,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const validateForm = (validateResults) => ({
  type: 'VALIDATE_FORM',
  validateResults
})
