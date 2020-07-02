const INITIAL_STATE = {
  error: null,
  payment: null,
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOKEN_FAILURE':
  case 'AUTHORIZE_FAILURE':
    return {
      ...state,
      error: action.result.error
    }

  case 'TOKEN_SUCCESS':
    return {
      ...state,
      token: action.result.data.token
    }

  case 'AUTHORIZE_SUCCESS':
    return {
      ...state,
      payment: action.result
    }

  case 'CLEAR':
    return {
      ...state,
      payment: null
    }

  default:
    return state
  }

}

export default reducer
