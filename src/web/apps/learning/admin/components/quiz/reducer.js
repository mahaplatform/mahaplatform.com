const INITIAL_STATE = {
  answering: null,
  quiz: null,
  question: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      quiz: action.result.data
    }

  case 'QUESTION_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'QUESTION_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      question: action.result.data
    }

  case 'ANSWER_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'ANSWER_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      answering: action.result.data
    }
  default:
    return state
  }

}

export default reducer
