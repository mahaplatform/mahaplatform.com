const INITIAL_STATE = {
  assignments: [],
  status: 'pending',
  unassigned: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      unassigned: action.result.data,
      status: 'ready'
    }

  default:
    return state
  }

}

export default reducer
