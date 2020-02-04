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
    if(step.type === 'conditional') {
      return {
        ...step,
        config: {
          options: [
            { value: true, text: 'True', then: segment(steps, `${step.code}`, true) },
            { value: false, text: 'False', then: segment(steps, `${step.code}`, false) }
          ]
        }
      }
    } else {
      return step
    }
  })
  return [
    ...result,
    ...result.length == 0 || result[result.length - 1].type !== 'conditional' ? [
      { parent: null, answer: null, type: 'ending', action: null }
    ] : []
  ]
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)
