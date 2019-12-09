const INITIAL_STATE = {
  state: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      state: action.state
    }

  case 'UPDATE':
    return {
      ...state,
      state: action.state
    }

  default:
    return state

  }

}
