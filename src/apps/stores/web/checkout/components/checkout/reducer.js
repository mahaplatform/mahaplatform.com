export const INITIAL_STATE = {
  contact: null,
  shipping_info: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE_CONTACT':
    return {
      ...state,
      contact: action.contact
    }

  case 'UPDATE_SHIPPING':
    return {
      ...state,
      shipping_info: action.shipping_info
    }

  default:
    return state

  }

}

export default reducer
