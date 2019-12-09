export const INITIAL_STATE = {
  payment: null
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

  default:
    return state

  }

}

export default reducer
