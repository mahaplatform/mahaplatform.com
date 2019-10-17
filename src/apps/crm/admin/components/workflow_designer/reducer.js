const INITIAL_STATE = {
  steps: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      steps: action.steps
    }

  case 'ADD':
    return {
      ...state,
      steps: [
        ...state.steps.map(step => ({
          ...step,
          delta: step.delta + (step.parent === action.step.parent && step.answer === action.step.answer && step.delta >= action.step.delta ? 1 : 0)
        })),
        action.step
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      steps: [
        ...state.steps.filter(step => {
          return step.code !== action.step.code && step.parent !== action.step.code
        }).map(step => ({
          ...step,
          delta: step.delta - (step.parent === action.step.parent && step.answer === action.step.answer && step.delta > action.step.delta ? 1 : 0)
        }))
      ]
    }
  default:
    return state
  }

}

export default reducer
