const INITIAL_STATE = {
  q: '',
  value: null,
  options: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CANCEL':
    return {
      ...state,
      options: []
    }

  case 'CHOOSE':
    return {
      ...state,
      q: '',
      options: [],
      value: action.value
    }

  case 'CLEAR':
    return {
      ...state,
      options: [],
      value: null
    }

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'SET':
    return {
      ...state,
      value: action.value
    }

  case 'SET_OPTIONS':
    return {
      ...state,
      options: action.options
    }

  default:
    return state
  }

}

export default reducer
