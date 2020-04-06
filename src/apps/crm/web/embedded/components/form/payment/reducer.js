export const INITIAL_STATE = {
  method: 'card',
  status: 'pending',
  paymentToken: null
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
      paymentToken: action.result.data.token,
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
