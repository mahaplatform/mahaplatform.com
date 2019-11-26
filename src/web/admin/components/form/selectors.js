import { createSelector } from 'reselect'
import { unflatten } from 'flat'
import Checkit from 'checkit'
import _ from 'lodash'

const sections = (state, props) => props.sections

const tabs = (state, props) => props.tabs

const data = state => state.data

const ready = state => state.ready

const busy = state => state.busy

const merged = createSelector(
  sections,
  tabs,
  (sections, tabs) => {
    if(sections) return sections
    if(tabs) return tabs.reduce((sections, tab) => [
      ...sections,
      ...tab.sections
    ], [])
    return []
  })

export const fields = createSelector(
  merged,
  (sections) => sections.reduce((fields, section) => [
    ...fields,
    ...section.fields.reduce((fields, field) => [
      ...fields,
      ...(field.type === 'fields') ? field.fields.reduce((fields, field) => [
        ...fields,
        field
      ], []) : [field]
    ], [])
  ], [])
)

export const defaults = createSelector(
  fields,
  (fields) => fields.reduce((defaults, field) => ({
    ...defaults,
    ...field.include !== false ? { [field.name]: field.defaultValue } : {}
  }), {})
)

export const filtered = createSelector(
  fields,
  data,
  (fields, data) => unflatten(fields.reduce((entity, field) => ({
    ...entity,
    ...(field.include && field.type !== 'text') ? { [field.name]: _.get(data, field.name) } : {}
  }), {}))
)

export const isReady = createSelector(
  fields,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.name)
  }) === undefined
)

export const isBusy = createSelector(
  busy,
  (busy) => busy.length > 0
)

export const rules = createSelector(
  fields,
  (fields) => fields.reduce((rules,field) => ({
    ...rules,
    [field.name]: [
      ...field.required ? ['required'] : [],
      ...field.rules || []
    ]
  }), {})
)


export const validateResults = createSelector(
  rules,
  filtered,
  (rules, filtered) => {
    const results = Checkit(rules).validateSync(filtered)
    return results[0] ? results[0].toJSON() : null
  }
)

export const isValid = createSelector(
  validateResults,
  (validateResults) => validateResults === null
)
