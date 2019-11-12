const INITIAL_STATE = {
  changes: 0,
  config: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      changes: 0,
      config: action.config
    }

  default:
    return state
  }

}

export default reducer
