const INITIAL_STATE = {
  active: null,
  changes: 0,
  hovering: null,
  status: 'ready',
  steps: [],
  step: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'NEW_STEP':
    return {
      ...state,
      step: {
        answer: action.answer,
        delta: action.delta,
        parent: action.parent
      }
    }

  case 'ADD':
    return {
      ...state,
      changes: state.changes + 1,
      hovering: null,
      steps: [
        ...state.steps.map(step => ({
          ...step,
          delta: step.delta + (step.parent === action.step.parent && step.answer === action.step.answer && step.delta >= action.step.delta ? 1 : 0)
        })),
        action.step
      ],
      step: null
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

  case 'REMOVE':
    return {
      ...state,
      active: state.active !== action.step.code ? state.active : null,
      changes: state.changes + 1,
      steps: [
        ...state.steps.filter(step => {
          return step.code !== action.step.code && step.parent !== action.step.code
        }).map(step => ({
          ...step,
          delta: step.delta - (step.parent === action.step.parent && step.answer === action.step.answer && step.delta > action.step.delta ? 1 : 0)
        }))
      ]
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'ready',
      changes: 0
    }

  case 'SET':
    return {
      ...state,
      steps: action.steps
    }

  case 'UPDATE':
    return {
      ...state,
      active: null,
      changes: state.changes + 1,
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
