export const INITIAL_STATE = {
  cards: [],
  import: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PUSH_CARD':
    return {
      ...state,
      cards: [
        ...state.cards,
        action.card
      ]
    }

  case 'POP_CARD':
    return {
      ...state,
      cards: state.cards.slice(0,-1)
    }

  case 'SET_IMPORT':
    return {
      ...state,
      import: action.import
    }

  default:
    return state

  }

}

export default reducer
