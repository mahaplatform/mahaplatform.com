export const INITIAL_STATE = {
  error: null,
  payment: null,
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
        reference: `${action.result.card_type}-${action.result.last_four}`,
        nonce: action.result.nonce,
        card_type: action.result.card_type,
        last_four: action.result.last_four
      }
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
      error: Object.values(action.result.errors)[0][0],
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
