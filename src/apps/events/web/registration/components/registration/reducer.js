export const INITIAL_STATE = {
  contact: null,
  quantities: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE_CONTACT':
    return {
      ...state,
      contact: action.contact
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
