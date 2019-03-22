export const INITIAL_STATE = {
  adding: false,
  editing: false,
  info: false,
  managing: false,
  selected: null,
  starred: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHOOSE':
    return {
      ...state,
      selected: action.id,
      starred: false
    }

  case 'LOAD_CHAT_SUCCESS':
    return {
      ...state,
      ...action.value || {}
    }

  case 'STARRED':
    return {
      ...state,
      selected: null,
      starred: true
    }

  case 'TOGGLE_ADDING':
    return {
      ...state,
      adding: !state.adding
    }

  case 'TOGGLE_EDITING':
    return {
      ...state,
      editing: !state.editing
    }

  case 'TOGGLE_INFO':
    return {
      ...state,
      info: !state.info
    }

  case 'TOGGLE_MANAGING':
    return {
      ...state,
      managing: !state.managing
    }

  default:
    return state

  }

}

export default reducer
