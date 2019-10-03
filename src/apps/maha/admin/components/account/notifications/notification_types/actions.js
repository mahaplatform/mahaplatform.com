export const set = (ignored) => ({
  type: 'SET',
  ignored
})

export const load = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'LOAD_REQUEST',
  success: 'LOAD_SUCCESS',
  failure: 'LOAD_FAILURE'
})

export const toggle = (notification_type_id, method) => ({
  type: 'TOGGLE',
  notification_type_id,
  method
})
