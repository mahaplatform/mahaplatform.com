export const INITIAL_STATE = {
  contact: null,
  payment: null,
  quantities: {},
  tickets: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE_CONTACT':
    return {
      ...state,
      contact: action.contact
    }

  case 'UPDATE_PAYMENT':
    return {
      ...state,
      payment: action.payment
    }

  case 'UPDATE_TICKETS':
    return {
      ...state,
      tickets: action.tickets
    }

  case 'UPDATE_QUANTITIES':
    return {
      ...state,
      quantities: action.quantities
    }

  default:
    return state

  }

}

export default reducer
