export const validate = (id, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/crm/forms/${id}/validate`,
  body,
  request: 'VALIDATE_REQUEST',
  success: 'VALIDATE_SUCCESS',
  failure: 'VALIDATE_FAILURE'
})

export const submit = (id, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/crm/forms/${id}`,
  body,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const change = (name, value) => ({
  type: 'CHANGE',
  name,
  value
})

export const setHuman = () => ({
  type: 'SET_HUMAN'
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
