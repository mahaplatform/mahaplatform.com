const INITIAL_STATE = {
  cvv: '',
  expirationDate: '',
  payment: null,
  number: '',
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      token: action.result.data.token
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      payment: {
        nonce: action.result.nonce,
        last_four: action.result.details.lastFour,
        type: action.result.details.cardType.toLowerCase()
      }
    }

  case 'UPDATE':
    return {
      ...state,
      [action.key]: action.value
    }

  default:
    return state
  }

}

export default reducer
