export const INITIAL_STATE = {
  asking: false,
  permission: null,
  push: null,
  status: 'pending',
  token: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PUSH_REGISTER_WORKER_SUCCESS':
    return {
      ...state,
      status: 'worker_registered'
    }

  case 'PUSH_LOAD_PERMISSION_SUCCESS':
    return {
      ...state,
      status: 'permission_loaded',
      permission: action.permission !== 'default' ? action.permission : 'unknown'
    }

  case 'LOAD_PUSH_SUCCESS':
    return {
      ...state,
      status: 'push_loaded',
      push: action.value || 'unknown'
    }

  case 'ASK':
    return {
      ...state,
      asking: action.asking
    }

  case 'SAVE_PUSH_SUCCESS':
    return {
      ...state,
      push: action.value
    }

  case 'PUSH_REQUEST_PERMISSION_SUCCESS':
    return {
      ...state,
      asking: state.asking && action.permission !== 'granted',
      status: 'permission_requested',
      permission: action.permission
    }

  case 'PUSH_GET_TOKEN_SUCCESS':
    return {
      ...state,
      token: action.token
    }

  default:
    return state
  }

}
