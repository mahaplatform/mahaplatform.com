const INITIAL_STATE = {
  active: 0,
  answers: {},
  status: 'ready'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved'
    }

  case 'ANSWER':
    return {
      ...state,
      active: state.active + 1,
      answers: {
        ...state.answers,
        [action.key]: action.value
      }
    }

  case 'BACK':
    return {
      ...state,
      active: state.active - 1
    }

  default:
    return state
  }

}

export default reducer
