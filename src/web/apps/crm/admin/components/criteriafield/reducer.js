const INITIAL_STATE = {
  active: false,
  criteria: { $and: [] },
  contacts: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'CLEAR':
    return {
      ...state,
      criteria: null
    }

  case 'END':
    return {
      ...state,
      active: false
    }

  case 'SET':
    return {
      ...state,
      criteria: action.criteria
    }

  default:
    return state
  }

}

export default reducer
