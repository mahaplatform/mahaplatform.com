export const INITIAL_STATE = {
  method: 'card',
  status: 'pending',
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      token: action.result.data.token,
      status: 'ready'
    }

  case 'SET_METHOD':
    return {
      ...state,
      method: action.method
    }

  default:
    return state

  }

}

export default reducer
