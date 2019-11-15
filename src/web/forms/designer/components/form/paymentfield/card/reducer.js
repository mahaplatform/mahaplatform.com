export const INITIAL_STATE = {
  nonce: null,
  nameOnCard: 'Greg Kops',
  number: '4111111111111111',
  cvv: '123',
  expirationDate: '10/25'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      nonce: action.result.nonce,
      type: action.result.details.cardType.toLowerCase(),
      last_four: action.result.details.lastFour,
      exp_month: action.result.details.expirationMonth,
      exp_year: action.result.details.expirationYear
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
