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
    return _.includes(['set','question','record','dial','voicemail'], step.action)
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
    ...steps.length > 0 ? [
      { label: 'Workflow', fields: steps.reduce((fields, step) => [
        ...fields,
        ..._.includes(['set','question'], step.action) ? [{
          name: step.config.name.value,
          key: `workflow.${step.config.code}`,
          type: 'text'
        }] : [],
        ...step.action === 'dial' ? [
          {
            name: `Call Status (${step.config.name.value})`,
            key: `workflow.${step.config.code}_status`,
            type: 'callstatus'
          },
          {
            name: `Call Recipient (${step.config.name.value})`,
            key: `workflow.${step.config.code}_recipient`,
            type: 'callrecipients',
            recipients: step.config.recipients
          }
        ] : [],
        ..._.includes(['record','voicemail'], step.action) ? [{
          name: `Recording Status (${step.config.name.value})`,
          key: `workflow.${step.config.code}`,
          type: 'text',
          comparisons: [
            { value: '$kn', text: 'was recorded' },
            { value: '$nkn', text: 'was not recorded' }
          ]
        }] : []
      ], [])}
    ] : []
  ]
)

export const tokens = createSelector(
  inputTokens,
  dynamicSteps,
  (inputTokens, steps) => [
    ...inputTokens,
    ...steps.length > 0 ? [{
      title: 'Workflow', tokens: steps.map(step => ({
        ..._.includes(['set','question'], step.action) ? {
          name: step.config.name.value,
          token: `workflow.${step.config.name.token}`
        } : {},
        ...step.action === 'dial' ? {
          name: `Was Answered (${step.config.name.value})`,
          token: `workflow.${step.config.name.token}_status`
        } : {},
        ...step.action === 'record' ? {
          name: `Recording URL (${step.config.name.value})`,
          token: `workflow.${step.config.name.token}_url`
        } : {},
        ...step.action === 'voicemail' ? {
          name: `Voicemail URL (${step.config.name.value})`,
          token: `workflow.${step.config.name.token}_url`
        } : {}
      }))
    }] : []
  ]
)
