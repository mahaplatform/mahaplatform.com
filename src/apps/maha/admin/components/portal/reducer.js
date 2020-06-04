const INITIAL_STATE = {
  mode: null,
  active: null,
  unseen: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_MODE':
    return {
      ...state,
      mode: action.mode
    }

  case 'CHOOSE':
    return {
      ...state,
      active: (action.index !== state.active) ? action.index : null
    }

  case 'UPDATE_UNSEEN':
    return {
      ...state,
      unseen: state.unseen + action.unseen
    }

  default:
    return state
  }

}
