export const INITIAL_STATE = {
  active: false,
  q: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'END':
    return {
      ...state,
      active: false
    }

  case 'TYPE':
    return {
      ...state,
      q: action.q
    }

  case 'ABORT':
    return {
      ...state,
      q: ''
    }

  default:
    return state
  }

}

export default reducer
