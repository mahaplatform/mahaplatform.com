export const INITIAL_STATE = {
  quantities: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      quantities: {
        ...state.quantities,
        [action.code]: action.value
      }
    }

  default:
    return state

  }

}

export default reducer
