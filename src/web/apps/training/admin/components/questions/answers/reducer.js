const INITIAL_STATE = {
  answers: [
    { delta: 0, text: '', is_active: true, is_correct: true }
  ]
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      answers: [
        ...state.answers,
        { delta: state.answers.length, text: '', is_active: true, is_correct: false }
      ]
    }

  case 'CHOOSE':
    return {
      ...state,
      answers: [
        ...state.answers.map((answer, index) => ({
          ...answer,
          is_correct: index === action.index
        }))
      ]
    }

  case 'MOVE':
    return {
      ...state,
      answers: ((action.from < action.to) ? [
        ...state.answers.slice(0, action.from),
        ...state.answers.slice(action.from + 1, action.to + 1),
        state.answers[action.from],
        ...state.answers.slice(action.to + 1)
      ] : [
        ...state.answers.slice(0, action.to),
        state.answers[action.from],
        ...state.answers.slice(action.to, action.from),
        ...state.answers.slice(action.from + 1)
      ]).map((answer, index) => ({
        ...answer,
        delta: index
      }))
    }

  case 'REMOVE':
    return {
      ...state,
      answers: [
        ...state.answers.map((answer, index) => ({
          ...answer,
          is_active: index === action.index ? !answer.is_active : answer.is_active
        })).filter((answer, index) => {
          return !(answer.id === undefined && index === action.index)
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      answers: action.answers
    }

  case 'UPDATE':
    return {
      ...state,
      answers: [
        ...state.answers.map((answer, index) => {
          if(index !== action.index) return answer
          return {
            ...answer,
            text: action.value
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
