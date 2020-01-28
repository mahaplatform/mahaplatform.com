export const submit = (code, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/crm/forms/${code}`,
  body,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const pay = (body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/crm/payments',
  body,
  request: 'PAY_REQUEST',
  success: 'PAY_SUCCESS',
  failure: 'PAY_FAILURE'
})

export const change = (name, value) => ({
  type: 'CHANGE',
  name,
  value
})

export const setHuman = () => ({
  type: 'SET_HUMAN'
})

export const setReady = (key) => ({
  type: 'SET_READY',
  key
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
