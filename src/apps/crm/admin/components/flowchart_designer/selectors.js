import { createSelector } from 'reselect'
import _ from 'lodash'

const inputFields = (state, props) => props.fields

const inputTokens = (state, props) => props.tokens

const steps = (state, props) => [
  { parent: null, answer: null, type: 'trigger', action: null },
  ...state.steps || []
]

const dynamicSteps = createSelector(
  steps,
  (steps) => steps.filter((step) => {
    return _.includes(['set','question','record'], step.action)
  })
)

const segment = (steps, parent, answer) => {
  const result = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).map(step => {
    return {
      ...step,
      branches: step.config && step.config.branches ? [
        ...step.config.branches.map(branch => ({
          ...branch,
          label: branch.name || branch.text,
          then: segment(steps, step.code, branch.code)
        })),
        {
          code: 'else',
          label: 'else',
          then: segment(steps, step.code, 'else')
        }
      ] : null
    }
  })
  return result
}

export const config = createSelector(
  steps,
  (steps) => segment(steps, null, null)
)

export const fields = createSelector(
  inputFields,
  dynamicSteps,
  (inputFields, steps) => [
    ...inputFields,
    ...steps.length > 0 ? [{
      label: 'Workflow Fields', fields: steps.map(step => ({
        name: step.config.name.value,
        key: step.config.code,
        type: 'text'
      }))
    }] : []
  ]
)

export const tokens = createSelector(
  inputTokens,
  dynamicSteps,
  (inputTokens, steps) => [
    ...inputTokens,
    ...steps.length > 0 ? [{
      title: 'Workflow', tokens: steps.map(step => ({
        ...step.action === 'record' ? {
          name: `${step.config.name.value} Redording URL`,
          token: `workflow.${step.config.name.token}_recording_url`
        } : {
          name: step.config.name.value,
          token: `workflow.${step.config.name.token}`
        }
      }))
    }] : []
  ]
)
