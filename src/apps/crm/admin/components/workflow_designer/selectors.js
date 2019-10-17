import { createSelector } from 'reselect'

const steps = (state, props) => state.steps || []

const segment = (steps, parent_id, answer_value) => {
  return steps.filter((step) => {
    return step.parent_id === parent_id && step.answer_value === answer_value
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
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
