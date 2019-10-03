export const INITIAL_STATE = {
  info: false,
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHOOSE':
    return {
      ...state,
      selected: action.id
    }

  case 'LOAD_CHAT_SUCCESS':
    return {
      ...state,
      info: action.value
    }

  case 'INFO':
    return {
      ...state,
      info: !state.info
    }

  default:
    return state

  }

}

export default reducer
