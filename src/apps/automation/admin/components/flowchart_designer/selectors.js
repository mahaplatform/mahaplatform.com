import { createSelector } from 'reselect'
import moment from 'moment'
import _ from 'lodash'

const inputFields = (state, props) => props.fields

const inputTokens = (state, props) => props.tokens

const versions = (state, props) => state.versions

const selected = (state, props) => state.selected

export const version = createSelector(
  versions,
  selected,
  (versions, selected) => versions.find(version => {
    return version.id === selected
  })
)

export const steps = createSelector(
  version,
  (version) => [
    { parent: null, answer: null, type: 'trigger', action: null, delta: -1 },
    ...version ? version.value.steps : []
  ]
)

const dynamicSteps = createSelector(
  steps,
  (steps) => steps.filter((step) => {
    return _.includes(['set','record'], step.action)
  })
)

const getTimeblock = (timeblock) => {
  const days = ['Su','M','T','W','Th','F','Sa']
  return [
    days.filter((day, index) => {
      return _.includes(timeblock.days, index)
    }).join('/'),
    ...timeblock.times.map(time => {
      return [
        moment(`2020-01-01 ${time.start_time}`).format('h:mmA'),
        moment(`2020-01-01 ${time.end_time}`).format('h:mmA')
      ].join('-')
    })
  ].join(', ')
}

const getBranches = (steps, step) => {
  if(!step.config) return null
  if(step.action === 'ifthen') {
    return  [
      ...step.config.branches.map(branch => ({
        code: branch.code,
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
        code: timeblock.code,
        label: timeblock.name,
        tooltip: getTimeblock(timeblock),
        then: segment(steps, step.code, timeblock.code)
      })),
      {
        code: 'else',
        label: 'else',
        tooltip: 'Time doesn\'t match criteria',
        then: segment(steps, step.code, 'else')
      }
    ]
  } else if(step.action === 'dialmenu') {
    return  [
      ...step.config.options.map(option => ({
        code: option.code,
        label: `${option.number}: ${option.name}`,
        tooltip: `Caller pressed ${option.number}`,
        then: segment(steps, step.code,  option.code)
      })),
      ..._.includes(step.config.specials, 'hash') ? [{
        code: 'hash',
        label: '#',
        tooltip: 'Caller pressed hash',
        then: segment(steps, step.code, 'hash')
      }] : [],
      ..._.includes(step.config.specials, 'star') ? [{
        code: 'star',
        label: '*',
        tooltip: 'Caller pressed star',
        then: segment(steps, step.code, 'star')
      }] : [],
      {
        code: 'noinput',
        tooltip: 'No input was received',
        label: 'no input',
        then: segment(steps, step.code, 'noinput')
      }
    ]
  } else if(step.action === 'question') {
    return  [
      ...step.config.answers ? step.config.answers.map(answer => ({
        code: answer.code,
        label: answer.text,
        tooltip: `Answer ${answer.operation === '$eq' ? 'equals' : 'contains'} "${answer.text}"`,
        then: segment(steps, step.code,  answer.code)
      })) : [],
      {
        code: 'else',
        tooltip: 'Answer doesn\'t match criteria',
        label: 'else',
        then: segment(steps, step.code, 'else')
      }
    ]
  } else if(_.includes(['dialbyname','dialbyextension'], step.action)) {
    return  [
      ..._.includes(step.config.specials, 'hash') ? [{
        code: 'hash',
        tooltip: 'Caller pressed hash',
        label: '#',
        then: segment(steps, step.code, 'hash')
      }] : [],
      ..._.includes(step.config.specials, 'star') ? [{
        code: 'star',
        tooltip: 'Caller pressed star',
        label: '*',
        then: segment(steps, step.code, 'star')
      }] : [],
      {
        code: 'noanswer',
        tooltip: 'Extension did not answer',
        label: 'no answer',
        then: segment(steps, step.code, 'noanswer')
      },
      {
        code: 'noinput',
        tooltip: 'No input was received',
        label: 'no input',
        then: segment(steps, step.code, 'noinput')
      }
    ]
  }
  return null
}

const segment = (steps, parent, answer) => {
  return steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  }).map(step => ({
    ...step,
    branches: getBranches(steps, step)
  }))
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
        ..._.includes(['set'], step.action) ? [{
          name: step.config.name.value,
          key: `workflow.${step.config.code}`,
          type: 'select',
          search: false,
          options: step.config.answers ? step.config.answers.map(answer => {
            return answer.answer
          }) : []
        }] : [],
        ..._.includes(['record'], step.action) ? [{
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
        ..._.includes(['set'], step.action) ? {
          name: step.config.name.value,
          token: `workflow.${step.config.name.token}`
        } : {},
        ...step.action === 'record' ? {
          name: `Recording URL (${step.config.name.value})`,
          token: `workflow.${step.config.name.token}_url`
        } : {}
      }))
    }] : []
  ]
)
