export const INITIAL_STATE = {
  profiles: [],
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
      profiles: action.result.data,
      status: 'success'
    }

  default:
    return state
  }

}

export default reducer
