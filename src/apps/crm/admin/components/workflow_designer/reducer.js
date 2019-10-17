const INITIAL_STATE = {
  steps: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      steps: action.steps
    }

  default:
    return state
  }

}

export default reducer
