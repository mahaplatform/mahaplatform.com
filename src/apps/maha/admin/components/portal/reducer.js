const INITIAL_STATE = {
  mode: null,
  active: null,
  help: false,
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

  case 'TOGGLE_HELP':
    return {
      ...state,
      help: !state.help
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
