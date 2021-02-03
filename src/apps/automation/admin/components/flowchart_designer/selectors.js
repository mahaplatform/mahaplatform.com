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

const getBranches = (steps, step) => {
  if(!step.config) return null
  if(step.action === 'ifthen') {
    return  [
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
    ]
  } else if(step.action === 'timeofday') {
    return  [
      ...step.config.timeblocks.map(timeblock => ({
        label: timeblock.name,
        then: segment(steps, step.code, timeblock.code)
      })),
      {
        code: 'else',
        label: 'else',
        then: segment(steps, step.code, 'else')
      }
    ]
  }
  return null
}

const segment = (steps, parent, answer) => {
  const result = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).map(step => {
    return {
      ...step,
      branches: getBranches(steps, step)
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
          type: 'select',
          search: false,
          options: step.config.answers ? step.config.answers.map(answer => {
            return answer.answer
          }) : []
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
