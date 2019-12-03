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
      payment: {
        card_type: action.result.details.cardType.toLowerCase(),
        exp_month: action.result.details.expirationMonth,
        exp_year: action.result.details.expirationYear,
        last_four: action.result.details.lastFour,
        nonce: action.result.nonce
      }
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
