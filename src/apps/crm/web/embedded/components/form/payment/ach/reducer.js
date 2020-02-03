export const INITIAL_STATE = {
  accountNumber: '',
  accountType: '',
  address: null,
  firstName: '',
  lastName: '',
  ownershipType: '',
  payment: null,
  routingNumber: '',
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'AUTHORIZE_REQUEST':
    return {
      ...state,
      error: null,
      status: 'authorizing'
    }

  case 'AUTHORIZE_FAILURE':
    return {
      ...state,
      error: action.result.errors.payment[0],
      status: 'failed'
    }

  case 'AUTHORIZE_SUCCESS':
    return {
      ...state,
      status: 'authorized',
      payment: {
        nonce: action.result.nonce,
        ownership_type: state.ownershipType,
        account_type: state.accountType,
        last_four: action.result.description.substr(-4)
      }
    }

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      status: 'submitting'
    }

  case 'SUBMIT_FAILURE':
    return {
      ...state,
      error: action.result.errors ? Object.values(action.result.errors)[0] : action.result.message,
      status: 'failure'
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'UPDATE':
    return {
      ...state,
      error: null,
      status: 'pending',
      [action.key]: action.value
    }

  default:
    return state

  }

}

export default reducer
