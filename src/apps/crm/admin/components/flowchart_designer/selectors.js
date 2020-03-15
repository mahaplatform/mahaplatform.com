import { createSelector } from 'reselect'
import _ from 'lodash'

const steps = (state, props) => [
  { parent: null, answer: null, type: 'trigger', action: null },
  ...state.steps || []
]

const segment = (steps, parent, answer) => {
  const result = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).map(step => {
    if(_.includes(['ifthen','question'], step.action)) {
      return {
        ...step,
        branches: [
          ...step.config.branches.map(branch => ({
            ...branch,
            label: branch.name || branch.text,
            then: segment(steps, step.code, branch.code)
          })),
          ...step.action === 'ifthen' ? [{
            code: 'else',
            label: 'else',
            then: segment(steps, step.code, 'else')
          }] : []
        ]
      }
    } else {
      return step
    }
  })
  return result
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
