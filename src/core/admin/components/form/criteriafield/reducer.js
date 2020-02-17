const INITIAL_STATE = {
  criteria: null,
  status: 'pending',
  total: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return {
      ...state,
      criteria: null
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      total: action.result.pagination.total
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
