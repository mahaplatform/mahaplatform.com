const INITIAL_STATE = {
  q: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  default:
    return state
  }

}

export default reducer
