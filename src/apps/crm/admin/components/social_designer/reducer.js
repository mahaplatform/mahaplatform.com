const INITIAL_STATE = {
  config: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE':
    return {
      ...state,
      config: action.config
    }

  default:
    return state
  }

}

export default reducer
