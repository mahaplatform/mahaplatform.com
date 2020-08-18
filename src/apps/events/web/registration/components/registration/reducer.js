export const INITIAL_STATE = {
  contact: null,
  quantities: {},
  status: 'pending',
  tickets: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      status: 'submitting'
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'UPDATE_CONTACT':
    return {
      ...state,
      contact: action.contact
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
