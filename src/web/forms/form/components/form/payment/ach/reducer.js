export const INITIAL_STATE = {
  routingNumber: '011000015',
  accountNumber: '1000000000'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      nonce: action.result.creditCards[0].nonce
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
