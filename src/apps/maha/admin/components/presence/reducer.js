const INITIAL_STATE = {
  presence: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_PRESENCE':
    return {
      ...state,
      presence: action.presence
    }

  default:
    return state
  }

}
