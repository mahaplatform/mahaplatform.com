const INITIAL_STATE = {
  error: null,
  status: 'pending',
  payment: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'AUTHORIZE_REQUEST':
    return {
      ...state,
      status: 'authorizing'
    }

  case 'AUTHORIZE_FAILURE':
    return {
      ...state,
      error: action.result.details.originalError.error.message,
      status: 'failed'
    }

  case 'AUTHORIZE_SUCCESS':
    return {
      ...state,
      status: 'authorized',
      payment: {
        reference: `${action.result.details.cardType.toLowerCase()}-${action.result.details.lastFour}`,
        card_type: action.result.details.cardType.toLowerCase(),
        last_four: action.result.details.lastFour,
        expiration_month: action.result.details.expirationMonth,
        expiration_year: action.result.details.expirationYear,
        nonce: action.result.nonce
      }
    }

  case 'CLEAR':
    return {
      ...state,
      payment: null
    }

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      error: null,
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

  default:
    return state
  }

}

export default reducer
