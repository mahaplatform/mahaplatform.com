const INITIAL_STATE = {
  questions: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'success',
      questions: action.result.data
    }

  case 'MOVE':
    return {
      ...state,
      questions: (action.from < action.to) ? [
        ...state.questions.slice(0, action.from),
        ...state.questions.slice(action.from + 1, action.to + 1),
        state.questions[action.from],
        ...state.questions.slice(action.to + 1)
      ] : [
        ...state.questions.slice(0, action.to),
        state.questions[action.from],
        ...state.questions.slice(action.to, action.from),
        ...state.questions.slice(action.from + 1)
      ]
    }

  default:
    return state
  }

}

export default reducer
