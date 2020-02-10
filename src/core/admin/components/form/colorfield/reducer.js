const INITIAL_STATE = {
  color: null,
  open: false,
  value: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHOOSE':
    return {
      ...state,
      value: action.color,
      color: action.color,
      open: false
    }

  case 'CLEAR':
    return {
      ...state,
      color: null
    }

  case 'OPEN':
    return {
      ...state,
      open: true
    }

  case 'CLOSE':
    return {
      ...state,
      open: false
    }

  case 'TYPE':
    return {
      ...state,
      value: action.value
    }

  default:
    return state
  }

}

export default reducer
