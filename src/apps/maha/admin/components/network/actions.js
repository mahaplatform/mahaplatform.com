export const init = (handler) => ({
  type: 'SOCKETIO_INIT',
  handler
})

export const addEventListener = (event, handler) => ({
  type: 'ADD_EVENT_LISTENER',
  event,
  handler
})

export const removeEventListener = (event, handler) => ({
  type: 'REMOVE_EVENT_LISTENER',
  event,
  handler
})

export const connect = () => ({
  type: 'CONNECT'
})

export const disconnect = () => ({
  type: 'DISCONNECT'
})

export const join = (channels) => ({
  type: 'SOCKETIO_JOIN',
  channels,
  request: 'JOIN'
})

export const joined = (channels) => ({
  type: 'JOINED',
  channels
})

export const leave = (channels) => ({
  type: 'SOCKETIO_LEAVE',
  channels,
  request: 'LEAVE'
})

export const left = (channels) => ({
  type: 'LEFT',
  channels
})

export const emit = (verb, channel, token, data) => ({
  type: 'SOCKETIO_EMIT',
  verb,
  channel,
  token,
  data,
  request: 'EMIT'
})

export const subscribe = (handlers) => ({
  type: 'SUBSCRIBE',
  handlers
})

export const unsubscribe = (handler) => ({
  type: 'UNSUBSCRIBE',
  handler
})

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

export const clearAlert = () => ({
  type: 'CLEAR_ALERT'
})

export const setAlert = (status, text) => ({
  type: 'SET_ALERT',
  status,
  text
})

export const setRevision = (revision) => ({
  type: 'SET_REVISION',
  revision
})
