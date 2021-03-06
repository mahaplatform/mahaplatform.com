export const INITIAL_STATE = {
  account: null,
  mode: 'verify',
  show: false,
  status: 'pending',
  token: null,
  verification: null
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
      account: action.result.data.account,
      verification: action.result.data.verification,
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
      error: action.result.message
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
