const INITIAL_STATE = {
  selected: null,
  profiles: [],
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
      profiles: action.result.data
    }

  case 'CHOOSE':
    return {
      ...state,
      selected: action.index
    }

  case 'CLEAR':
    return {
      ...state,
      selected: null
    }

  default:
    return state
  }

}

export default reducer
