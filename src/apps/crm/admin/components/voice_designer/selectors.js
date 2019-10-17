import { createSelector } from 'reselect'
import _ from 'lodash'

const steps = (state, props) => state.steps || []

const segment = (steps, parent_id, answer_value) => {
  return steps.filter((step) => {
    return step.parent_id === parent_id && step.answer_value === answer_value
  }).sort((a, b) => {
    return a < b ? -1 : 1
  }).map(step => {
    if(_.includes(['question','ifelse'], step.type)) {
      return {
        ...step,
        options: step.config.options.map(option => ({
          ...option,
          then: segment(steps, step.id, option.value)
        }))
      }
    } else if(_.includes(['action','speak','send'], step.type)) {
      return {
        ...step,
        ...step.config
      }
    } else {
      return step
    }
  })
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
