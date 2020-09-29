const INITIAL_STATE = {
  questions: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      questions: [
        ...state.questions,
        {
          ...action.question,
          delta: state.questions.length
        }
      ]
    }

  case 'MOVE':
    return {
      ...state,
      questions: ((action.from < action.to) ? [
        ...state.questions.slice(0, action.from),
        ...state.questions.slice(action.from + 1, action.to + 1),
        state.questions[action.from],
        ...state.questions.slice(action.to + 1)
      ] : [
        ...state.questions.slice(0, action.to),
        state.questions[action.from],
        ...state.questions.slice(action.to, action.from),
        ...state.questions.slice(action.from + 1)
      ]).map((question, index) => ({
        ...question,
        delta: index
      }))
    }

  case 'SET':
    return {
      ...state,
      questions: action.questions
    }

  case 'UPDATE':
    return {
      ...state,
      questions: [
        ...state.questions.map((question) => ({
          ...(question.delta === action.question.delta) ? action.question : question
        }))
      ]
    }

  default:
    return state
  }

}

export default reducer
