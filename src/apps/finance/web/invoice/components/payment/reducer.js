export const INITIAL_STATE = {
  status: 'pending',
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOKEN_SUCCESS':
    return {
      ...state,
      token: action.result.data.token
    }

  case 'PAY_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'PAY_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
