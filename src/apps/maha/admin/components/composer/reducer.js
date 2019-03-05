export const INITIAL_STATE = {
  emojis: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE_EMOJIS':
    return {
      ...state,
      emojis: !state.emojis
    }

  default:
    return state

  }

}

export default reducer
