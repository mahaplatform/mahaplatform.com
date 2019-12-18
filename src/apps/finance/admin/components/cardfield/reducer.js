const INITIAL_STATE = {
  payment: null,
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
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
