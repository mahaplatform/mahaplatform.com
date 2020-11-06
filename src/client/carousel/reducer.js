const INITIAL_STATE = {
  direction: 'left',
  active: 0,
  total: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_TOTAL':
    return {
      ...state,
      total: action.total
    }
    
  case 'PREVIOUS':
    return {
      ...state,
      direction: 'right',
      active: state.active === 0 ? state.total - 1 :  state.active - 1
    }

  case 'NEXT':
    return {
      ...state,
      direction: 'left',
      active: state.active === state.total - 1 ? 0 : state.active + 1
    }

  case 'GOTO':
    return {
      ...state,
      direction: (action.index > state.index || (state.index === state.total && action.index === 0)) ? 'left' : 'right',
      active: action.index
    }

  default:
    return state
  }

}

export default reducer
