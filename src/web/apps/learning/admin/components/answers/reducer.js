const INITIAL_STATE = {
  correct_answer: 0,
  answers: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      answers: [
        ...state.answers,
        { text: '' }
      ]
    }

  case 'CHOOSE':
    return {
      ...state,
      correct_answer: action.index
    }

  case 'MOVE':
    return {
      ...state,
      answers: (action.from < action.to) ? [
        ...state.answers.slice(0, action.from),
        ...state.answers.slice(action.from + 1, action.to + 1),
        state.answers[action.from],
        ...state.answers.slice(action.to + 1)
      ] : [
        ...state.answers.slice(0, action.to),
        state.answers[action.from],
        ...state.answers.slice(action.to, action.from),
        ...state.answers.slice(action.from + 1)
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      correct_answer: action.index === state.correct_answer ? Math.max(action.index - 1, 0) : state.correct_answer,
      answers: [
        ...state.answers.filter((answer, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
