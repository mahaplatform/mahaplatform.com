const INITIAL_STATE = {
  answers: [
    { text: '', is_active: true, is_correct: true }
  ]
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      answers: [
        ...state.answers,
        { text: '', is_active: true, is_correct: false }
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

  case 'REMOVE':
    return {
      ...state,
      answers: state.answers.length > 1 ? [
        ...state.answers.map((answer, index) => ({
          ...answer,
          is_active: index === action.index ? false : answer.is_active
        })).filter((answer, index) => {
          return !(answer.id === undefined && index === action.index)
        })
      ] : [
        { text: '', is_active: true, is_correct: true }
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
