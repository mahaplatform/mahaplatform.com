const INITIAL_VALUE = {
  active: false,
  value: null,
  month: null,
  year: null
}

const reducer = (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case 'SET_CURRENT':
    return {
      ...state,
      month: action.month,
      year: action.year
    }

  case 'SET_VALUE':
    return {
      ...state,
      value: action.value
    }

  case 'PREVIOUS':
    return {
      ...state,
      month: state.month !== null ? (state.month === 0 ? 11 : state.month - 1) : null,
      year: state.year !== null ? (state.month === 0 ? state.year - 1 : state.year) : null
    }

  case 'NEXT':
    return {
      ...state,
      month: state.month !== null ? (state.month === 11 ? 0 : state.month + 1) : null,
      year: state.year !== null ? (state.month === 11 ? state.year + 1 : state.year) : null
    }

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'CANCEL':
    return {
      ...state,
      active: false
    }

  case 'CHOOSE':
    return {
      ...state,
      value: action.value,
      active: false
    }

  case 'CLEAR':
    return {
      ...state,
      value: null
    }

  default:
    return state

  }

}

export default reducer
