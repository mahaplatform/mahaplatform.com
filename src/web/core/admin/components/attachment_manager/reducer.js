export const INITIAL_STATE = {
  selected: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SELECT':
    return {
      ...state,
      selected: action.index
    }

  default:
    return state

  }

}

export default reducer
