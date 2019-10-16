import { createSelector } from 'reselect'
import _ from 'lodash'

const steps = (state, props) => state.steps || []

const segment = (steps, parent_id, answer_value) => {
  return steps.filter((step) => {
    return step.parent_id === parent_id && step.answer_value === answer_value
  }).sort((a, b) => {
    return a < b ? -1 : 1
  }).map(step => {
    if(step.type === 'question') {
      return {
        ...step,
        options: step.config.options.map(option => ({
          ...option,
          then: segment(steps, step.id, option.value)[0]
        }))
      }
    }
    if(_.includes(['answer','iselse'], step.type)) {
      return segment(steps, step.id, null)
    }
    if(_.includes(['action','speak'], step.type)) {
      return {
        ...step,
        ...step.config
      }
    }
    if(step.type === 'send') {
      return {
        ...step,
        ...step.config
      }
    }
    return step
  })
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
