export const INITIAL_STATE = {
  payment: null,
  routingNumber: '',
  accountNumber: '',
  ownershipType: '',
  accountType: '',
  firstName: '',
  lastName: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      payment: {
        nonce: action.result.nonce,
        last_four: action.result.description.substr(-4)
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
