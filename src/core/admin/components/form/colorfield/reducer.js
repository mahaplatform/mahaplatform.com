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
      color: action.color,
      open: false,
      value: action.color
    }

  case 'CLEAR':
    return {
      ...state,
      color: null,
      open: false,
      value: ''
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
