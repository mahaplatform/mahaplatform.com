import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  changes: 0,
  expanded: [],
  hovering: null,
  status: 'ready',
  steps: [],
  step: null
}

const getChildren = (steps, code) => {
  const item = steps.find(step => {
    return step.code === code
  })
  return steps.filter(step => {
    return step.parent === item.code
  }).reduce((children, child) => [
    ...children,
    ...getChildren(steps, child.code)
  ], [item])
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'NEW_STEP':
    return {
      ...state,
      step: action.step
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
      expanded: [
        ...state.expanded,
        action.step.code
      ],
      step: null
    }

  case 'EDIT':
    return {
      ...state,
      active: action.code
    }

  case 'EXPAND':
    return {
      ...state,
      expanded: [
        ..._.xor(state.expanded, [action.code])
      ]
    }

  case 'HOVER':
    return {
      ...state,
      hovering: action.hovering
    }

  case 'REMOVE':
    return {
      ...state,
      active: null,
      changes: state.changes + 1,
      steps: [
        ...state.steps.filter(step => {
          return getChildren(state.steps, action.step.code).find(child => {
            return child.code === step.code
          }) === undefined
        })
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
