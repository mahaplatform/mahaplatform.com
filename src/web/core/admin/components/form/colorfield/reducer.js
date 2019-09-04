const INITIAL_STATE = {
  choosing: false,
  color: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'BEGIN':
    return {
      ...state,
      choosing: true
    }

  case 'CLEAR':
    return {
      ...state,
      color: null
    }

  case 'SET':
    return {
      ...state,
      choosing: false,
      color: action.color
    }

  default:
    return state
  }

}

export default reducer
