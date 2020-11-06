export const submitForm = (endpoint, method, token, body) => ({
  type: 'API_REQUEST',
  endpoint,
  method,
  token,
  body,
  request: 'SUBMIT_FORM_REQUEST',
  success: 'SUBMIT_FORM_SUCCESS',
  failure: 'SUBMIT_FORM_FAILURE'
})

export const change = (name, value) => ({
  type: 'CHANGE',
  name,
  value
})

export const setHuman = () => ({
  type: 'SET_HUMAN'
})

export const setReady = (name) => ({
  type: 'SET_READY',
  name
})

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
})

export const setValid = (name, value, error) => ({
  type: 'SET_VALID',
  name,
  value,
  error
})

export const validate = () => ({
  type: 'VALIDATE'
})
