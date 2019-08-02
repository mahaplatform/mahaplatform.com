const INITIAL_STATE = {
  activities: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: state.status === 'pending' ? 'loading' : 'refreshing'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      activities: action.result.data,
      status: 'ready'
    }

  default:
    return state
  }

}

export default reducer
