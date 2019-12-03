import { createSelector } from 'reselect'
import { unflatten } from 'flat'
import Checkit from 'checkit'
import _ from 'lodash'

const sections = (state, props) => props.sections

const tabs = (state, props) => props.tabs

const data = state => state.data

const ready = state => state.ready

const busy = state => state.busy

const status = state => state.status

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

const submittable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return field.include !== false && !_.includes(['text','submit'], field.type)
  })
)

export const defaults = createSelector(
  submittable,
  (fields) => {
    return fields.reduce((defaults, field) => ({
      ...defaults,
      [field.name]: field.defaultValue
    }), {})
  }
)

export const filtered = createSelector(
  submittable,
  data,
  (fields, data) => unflatten(fields.reduce((entity, field) => {
    return {
      ...entity,
      [field.name]: _.get(data, field.name)
    }
  }, {}))
)

export const isReady = createSelector(
  submittable,
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
  submittable,
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

export const isConfiguring = createSelector(
  status,
  (status) => _.includes(['pending','loading_data'], status)
)
