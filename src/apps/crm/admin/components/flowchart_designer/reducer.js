const INITIAL_STATE = {
  active: null,
  hovering: null,
  steps: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {


  case 'ADD':
    return {
      ...state,
      active: action.step.code,
      steps: [
        ...state.steps.map(step => ({
          ...step,
          delta: step.delta + (step.parent === action.step.parent && step.answer === action.step.answer && step.delta >= action.step.delta ? 1 : 0)
        })),
        action.step
      ]
    }

  case 'EDIT':
    return {
      ...state,
      active: action.code
    }


  case 'HOVER':
    return {
      ...state,
      hovering: action.hovering
    }

  case 'MOVE':
    return {
      ...state,
      steps: [
        ...state.steps.map(step => {
          if(step.code === action.code) {
            return {
              ...step,
              parent: action.parent,
              answer: action.answer,
              delta: action.delta
            }
          } else if(step.parent === action.parent && step.parent === action.parent) {
            return {
              ...step,
              delta: step.delta + 1
            }
          } else {
            return step
          }
        })
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      active: state.active !== action.step.code ? state.active : null,
      steps: [
        ...state.steps.filter(step => {
          return step.code !== action.step.code && step.parent !== action.step.code
        }).map(step => ({
          ...step,
          delta: step.delta - (step.parent === action.step.parent && step.answer === action.step.answer && step.delta > action.step.delta ? 1 : 0)
        }))
      ]
    }

  case 'SET':
    return {
      ...state,
      steps: action.steps
    }

  case 'UPDATE':
    return {
      ...state,
      steps: [
        ...state.steps.map(step => {
          if(step.code !== action.code) return step
          return {
            ...step,
            config: action.config
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
