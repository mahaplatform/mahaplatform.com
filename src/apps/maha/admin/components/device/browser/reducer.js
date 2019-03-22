export const INITIAL_STATE = {
  title: null,
  unseen: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_TITLE':
    return {
      ...state,
      title: action.title
    }

  case 'UPDATE_UNSEEN':
    return {
      ...state,
      unseen: action.unseen
    }

  default:
    return state
  }

}
