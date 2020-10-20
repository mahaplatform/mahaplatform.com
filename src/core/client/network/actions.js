export const request = ({ method, endpoint, query, body, onSuccess, onFailure }) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  query,
  body,
  request: 'REQUEST_REQUEST',
  success: 'REQUEST_SUCCESS',
  failure: 'REQUEST_FAILURE',
  onSuccess,
  onFailure
})

export const join = (channels) => ({
  type: 'SOCKETIO_JOIN',
  channels,
  request: 'JOIN'
})

export const leave = (channels) => ({
  type: 'SOCKETIO_LEAVE',
  channels,
  request: 'LEAVE'
})

export const subscribe = (handlers) => ({
  type: 'SUBSCRIBE',
  handlers
})

export const unsubscribe = (handler) => ({
  type: 'UNSUBSCRIBE',
  handler
})
