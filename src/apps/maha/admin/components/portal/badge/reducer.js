export const INITIAL_STATE = {
  status: 'pending',
  count: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: state.status === 'pending' ? 'loading' : 'refreshing'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      count: action.result.data.count,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
