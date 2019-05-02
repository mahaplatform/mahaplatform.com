import _ from 'lodash'

export const INITIAL_STATE = {
  id: null,
  browser: null,
  device: null,
  fingerprint: null,
  os: null,
  platform: null,
  push_enabled: null,
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_FINGERPRINT_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_FINGERPRINT_SUCCESS':
    return {
      ...state,
      fingerprint: action.value || _.random(100000000, 999999999).toString(36),
      status: 'generated'
    }

  case 'CREATE_DEVICE_SUCCESS':
    return {
      ...state,
      ...action.result.data,
      status: 'success'
    }

  case 'FETCH_DEVICE_SUCCESS':
    return {
      ...state,
      ...action.result.data,
      status: 'ready'
    }

  case 'SAVE_FINGERPRINT_SUCCESS':
    return {
      ...state,
      status: 'ready'
    }

  default:
    return state
  }
}
