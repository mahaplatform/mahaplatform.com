const INITIAL_STATE = {
  sources: [],
  status: 'pending'
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
      status: 'loaded',
      sources: action.result.data
    }

  default:
    return state
  }

}

export default reducer
