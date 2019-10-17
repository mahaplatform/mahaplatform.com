import { createSelector } from 'reselect'

const steps = (state, props) => [
  { parent_id: null, answer: null, type: 'trigger' },
  ...state.steps || []
]

const segment = (steps, parent_id, answer) => {
  const result = steps.filter((step) => {
    return step.parent_id === parent_id && step.answer === answer
  }).sort((a, b) => {
    return a < b ? -1 : 1
  }).map(step => {
    if(step.type === 'conditional') {
      return {
        ...step,
        action: step.config.action,
        options: step.config.options.map(option => ({
          ...option,
          then: segment(steps, step.id, option.value)
        }))
      }
    } else {
      return {
        ...step,
        ...step.config
      }
    }
  })
  return [
    ...result,
    ...result.length == 0 || result[result.length - 1].type !== 'conditional' ? [
      { parent_id: null, answer: null, type: 'ending' }
    ] : []
  ]
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
