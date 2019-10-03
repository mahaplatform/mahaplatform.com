const INITIAL_STATE = {
  active: false,
  q: '',
  value: null,
  options: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'CANCEL':
    return {
      ...state,
      options: [],
      active: false
    }

  case 'CHOOSE':
    return {
      ...state,
      active: false,
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
