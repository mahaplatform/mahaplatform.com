export const INITIAL_STATE = {
  nonce: null,
  type: null,
  last_four: null,
  exp_month: null,
  exp_year: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      nonce: action.result.creditCards[0].nonce,
      type: action.result.creditCards[0].details.cardType.toLowerCase(),
      last_four: action.result.creditCards[0].details.lastFour,
      exp_month: action.result.creditCards[0].details.expirationMonth,
      exp_year: action.result.creditCards[0].details.expirationYear
    }

  default:
    return state

  }

}

export default reducer
