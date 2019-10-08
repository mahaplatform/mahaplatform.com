const INITIAL_STATE = {
  type: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      [action.key]: action.value
    }

  default:
    return state
  }

}

export default reducer
