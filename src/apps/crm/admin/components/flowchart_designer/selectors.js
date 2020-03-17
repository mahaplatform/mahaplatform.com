import { createSelector } from 'reselect'
import _ from 'lodash'

const inputFields = (state, props) => props.fields

const inputTokens = (state, props) => props.tokens

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

export const stepTokens = createSelector(
  steps,
  (steps) => steps.length > 1 ? [{
    title: 'Workflow Variables', tokens: steps.filter((step) => {
      return _.includes(['question','record'], step.action)
    }).map(step => ({
      name: step.config.name.value,
      token: `workflow.${step.config.name.token}`
    }))
  }] : []
)


export const stepFields = createSelector(
  steps,
  (steps) => steps.length > 1 ? [{
    label: 'Workflow Fields', fields: steps.filter((step) => {
      return _.includes(['question','record'], step.action)
    }).map(step => ({
      name: step.config.name.value,
      key: step.config.code,
      type: 'text'
    }))
  }] : []
)

export const fields = createSelector(
  inputFields,
  stepFields,
  (inputFields, stepFields) => [
    ...inputFields,
    ...stepFields
  ]
)

export const tokens = createSelector(
  inputTokens,
  stepTokens,
  (inputTokens, stepTokens) => [
    ...inputTokens,
    ...stepTokens
  ]
)
