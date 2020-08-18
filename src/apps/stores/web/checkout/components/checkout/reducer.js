export const INITIAL_STATE = {
  contact: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE_CONTACT':
    return {
      ...state,
      contact: action.contact
    }

  default:
    return state

  }

}

export default reducer
