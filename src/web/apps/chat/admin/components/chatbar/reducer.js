export const INITIAL_STATE = {
  message: null,
  showEdit: false,
  showInfo: false,
  showNew: false,
  showSubscriptions: false,
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHOOSE':
    return {
      ...state,
      selected: action.id
    }

  case 'SET_EDIT':
    return {
      ...state,
      showEdit: action.show
    }

  case 'SET_INFO':
    return {
      ...state,
      showInfo: action.show
    }

  case 'SET_MESSAGE':
    return {
      ...state,
      message: action.message
    }

  case 'SET_NEW':
    return {
      ...state,
      showNew: action.show
    }

  case 'SET_SUBSCRIPTONS':
    return {
      ...state,
      showSubscriptions: action.show
    }

  default:
    return state

  }

}

export default reducer
