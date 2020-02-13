const INITIAL_STATE = {
  criteria: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return {
      ...state,
      criteria: null
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
