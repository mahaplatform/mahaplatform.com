export const fetch = (endpoint, defaults) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  meta: { defaults },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const submitForm = (method, endpoint, data) => ({
  type: 'API_REQUEST',
  method,
  ...method.toLowerCase() === 'get' ? {
    query: data
  } : {
    body: data
  },
  endpoint,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const setBusy = (key, value) => ({
  type: 'SET_BUSY' ,
  key,
  value
})

export const setData = (data) => ({
  type: 'SET_DATA',
  data
})

export const setReady = (key) => ({
  type: 'SET_READY',
  key
})

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
})

export const setValid = (key, value, errors) => ({
  type: 'SET_VALID',
  key,
  value,
  errors
})

export const updateData = (key, value) => ({
  type: 'UPDATE_DATA',
  key,
  value
})

export const validate = () => ({
  type: 'VALIDATE'
})
