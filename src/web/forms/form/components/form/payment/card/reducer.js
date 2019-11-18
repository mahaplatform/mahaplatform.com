export const INITIAL_STATE = {
  payment: null,
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
