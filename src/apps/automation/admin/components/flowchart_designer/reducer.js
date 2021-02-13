import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  changes: 0,
  expanded: [],
  hovering: null,
  selected: null,
  status: 'ready',
  step: null,
  versions: []
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

  case 'FETCH_SUCCESS':
    return {
      ...state,
      versions: action.result.data,
      selected: action.result.data[0].id
    }

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
      versions: [
        ...state.versions.map(version => ({
          ...version,
          value: {
            steps: (version.id === state.selected) ? [
              ...version.value.steps.map(step => ({
                ...step,
                delta: step.delta + (step.parent === action.step.parent && step.answer === action.step.answer && step.delta >= action.step.delta ? 1 : 0)
              })),
              action.step
            ] : version.value.steps
          }
        }))
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
      versions: [
        ...state.versions.map(version => ({
          ...version,
          value: {
            steps: (version.id === state.selected) ? [
              ...version.value.steps.filter(step => {
                return getChildren(version.value.steps, action.step.code).find(child => {
                  return child.code === step.code
                }) === undefined
              })
            ] : version.value.steps
          }
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
      versions: [
        ...state.versions.map(version => ({
          ...version,
          value: {
            steps: (version.id === state.selected) ? [
              ...version.value.steps.map(step => {
                if(step.code !== action.code) return step
                return {
                  ...step,
                  config: action.config
                }
              })
            ] : version.value.steps
          }
        }))
      ]
    }

  case 'SET_VERSION':
    return {
      ...state,
      selected: action.index
    }

  default:
    return state
  }

}

export default reducer
