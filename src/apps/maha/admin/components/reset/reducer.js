export const INITIAL_STATE = {
  mode: 'verify',
  show: false,
  status: 'pending',
  token: null,
  team: null,
  question: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'VERIFY_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting',
      token: action.request.params.token
    }

  case 'VERIFY_FAILURE':
    return {
      ...state,
      mode: 'invalid',
      status: 'failure'
    }

  case 'VERIFY_SUCCESS':
    return {
      ...state,
      mode: 'security',
      user: action.result.data.user,
      question: action.result.data.question,
      status: 'success'
    }

  case 'PASSWORD_REQUEST':
  case 'SECURITY_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'PASSWORD_FAILURE':
  case 'SECURITY_FAILURE':
    return {
      ...state,
      status: 'failure',
      error: action.result.meta.message
    }

  case 'SECURITY_SUCCESS':
    return {
      ...state,
      status: 'success',
      mode: 'password'
    }

  case 'PASSWORD_SUCCESS':
    return {
      ...state,
      token: action.result.data.token,
      team: action.result.data.team,
      status: 'success',
      mode: 'complete'
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

  default:
    return state
  }

}
