export const save = (endpoint, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const change = (name, value) => ({
  type: 'CHANGE',
  name,
  value
})

export const setStatus = (name, status) => ({
  type: 'SET_STATUS',
  name,
  status
})

export const setAllStatus = (status) => ({
  type: 'SET_All_STATUS',
  status
})

export const setFinalized = (name, value) => ({
  type: 'SET_FINALIZED',
  name,
  value
})

export const setValidate = (name, status, error) => ({
  type: 'SET_VALIDATE',
  name,
  status,
  error
})
