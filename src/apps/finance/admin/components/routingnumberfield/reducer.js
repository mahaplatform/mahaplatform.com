const INITIAL_STATE = {
  number: '',
  bank: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return {
      ...state,
      bank: null
    }

  case 'LOOKUP_SUCCESS':
    return {
      ...state,
      bank: action.result.data
    }

  case 'UPDATE':
    return {
      ...state,
      number: action.number
    }

  default:
    return state
  }

}

export default reducer
