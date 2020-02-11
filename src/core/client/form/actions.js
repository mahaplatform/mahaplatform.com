export const submit = (endpoint, method, token, body) => ({
  type: 'API_REQUEST',
  endpoint,
  method,
  token,
  body,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const change = (code, value) => ({
  type: 'CHANGE',
  code,
  value
})

export const setHuman = () => ({
  type: 'SET_HUMAN'
})

export const setReady = (code) => ({
  type: 'SET_READY',
  code
})

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
})

export const setValid = (code, value, error) => ({
  type: 'SET_VALID',
  code,
  value,
  error
})

export const validate = () => ({
  type: 'VALIDATE'
})
