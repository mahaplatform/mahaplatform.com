export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const save = (endpoint, method, body) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  body,
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const setData = (formdata) => ({
  type: 'SET_DATA',
  formdata
})

export const setStep = (step) => ({
  type: 'SET_STEP',
  step
})

export const updateData = (formdata, step) => ({
  type: 'UPDATE_DATA',
  formdata,
  step
})
