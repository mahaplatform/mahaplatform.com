export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const set = (consent) => ({
  type: 'SET',
  consent
})

export const toggle = (program_id, key, value) => ({
  type: 'TOGGLE',
  program_id,
  key,
  value
})
