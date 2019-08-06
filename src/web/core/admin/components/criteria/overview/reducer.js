const INITIAL_STATE = {
  active: null,
  filters: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHOOSE':
    return {
      ...state,
      active: action.id
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      filters: action.result.data,
      status: 'success'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  default:
    return state
  }

}

export default reducer
