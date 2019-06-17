export const INITIAL_STATE = {
  error: null,
  mode: null,
  show: false,
  status: 'pending',
  removing: false,
  team: null,
  user: null,
  token: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TEAM_REQUEST':
  case 'EMAIL_REQUEST':
  case 'PASSWORD_REQUEST':
  case 'LOCKOUT_REQUEST':
  case 'FORGOT_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'TEAM_FAILURE':
  case 'EMAIL_FAILURE':
  case 'PASSWORD_FAILURE':
  case 'LOCKOUT_FAILURE':
  case 'FORGOT_FAILURE':
    return {
      ...state,
      status: 'failure',
      error: action.result.message
    }

  case 'TEAM_SUCCESS':
    return {
      ...state,
      team: action.result.data,
      status: 'success'
    }

  case 'EMAIL_SUCCESS':
    return {
      ...state,
      ...action.result.data,
      status: 'success'
    }

  case 'PASSWORD_SUCCESS':
    return {
      ...state,
      token: action.result.data.token,
      status: 'success'
    }

  case 'LOCKOUT_SUCCESS':
    return {
      ...state,
      mode: 'lockout'
    }

  case 'FORGOT_SUCCESS':
    return {
      ...state,
      status: 'reset'
    }

  case 'CHANGE_MODE':
    return {
      ...state,
      mode: action.mode
    }

  case 'TOGGLE_PASSWORD':
    return {
      ...state,
      show: !state.show
    }

  case 'TOGGLE_REMOVE':
    return {
      ...state,
      removing: !state.removing
    }

  case 'SET':
    return {
      ...state,
      team: action.team,
      user: action.user,
      mode: action.mode
    }

  case 'RESET':
    return INITIAL_STATE

  default:
    return state
  }

}
