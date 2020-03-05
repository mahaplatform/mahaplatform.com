import { createSelector } from 'reselect'

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
    if(step.action === 'ifthen') {
      return {
        ...step,
        branches: [
          ...step.config.branches.map(branch => ({
            ...branch,
            then: segment(steps, step.code, branch.code)
          })),
          {
            code: 'else',
            name: 'else',
            then: segment(steps, step.code, 'else')
          }
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
