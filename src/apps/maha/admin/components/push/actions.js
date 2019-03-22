export const registerWorker = () => ({
  type: 'PUSH_REGISTER_WORKER'
})

export const loadPermission = () => ({
  type: 'PUSH_LOAD_PERMISSION'
})

export const loadPush = () => ({
  type: 'LOCAL_GET',
  key: 'push',
  request: 'LOAD_PUSH_REQUEST',
  success: 'LOAD_PUSH_SUCCESS',
  failure: 'LOAD_PUSH_FAILURE'
})

export const ask = (asking) => ({
  type: 'ASK',
  asking
})

export const savePush = (value) => ({
  type: 'LOCAL_SET',
  key: 'push',
  value,
  request: 'SAVE_PUSH_REQUEST',
  success: 'SAVE_PUSH_SUCCESS',
  failure: 'SAVE_PUSH_FAILURE'
})

export const setPermission = (permission) => ({
  type: 'SET_PERMISSION',
  permission
})

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  token
})

export const requestPermission = () => ({
  type: 'PUSH_REQUEST_PERMISSION'
})

export const getToken = () => ({
  type: 'PUSH_GET_TOKEN'
})
