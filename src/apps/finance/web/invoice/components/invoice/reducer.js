const INITIAL_STATE = {
  invoice: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      invoice: action.result.data,
      status: 'success'
    }

  default:
    return state
  }

}

export default reducer
