import { createSelector } from 'reselect'
import { unflatten } from 'flat'
import _ from 'lodash'

const sections = (state, props) => props.sections

const tabs = (state, props) => props.tabs

const data = state => state.data

const errors = state => state.errors

const ready = state => state.ready

const busy = state => state.busy

const status = state => state.status

const validated = state => state.validated

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

const reduce = (fields) => fields.reduce((fields, field) => [
  ...fields,
  ...(_.includes(['fields','segment'], field.type)) ? field.fields.reduce((fields, field) => [
    ...fields,
    ...(_.includes(['fields','segment'], field.type)) ? reduce(field.fields) : [field]
  ], []) : [field]
], [])

export const fields = createSelector(
  merged,
  (sections) => sections.reduce((fields, section) => [
    ...fields,
    ...reduce(section.fields)
  ], [])
)

const submittable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return field.include !== false && !_.includes(['fields','segment','submit','text'], field.type)
  })
)

export const fieldNames = createSelector(
  submittable,
  (fields) => fields.filter(field => {
    return field.name !== undefined
  }).map(field => field.name)
)

export const defaults = createSelector(
  submittable,
  (fields) => fields.reduce((defaults, field) => ({
    ...defaults,
    [field.name]: field.defaultValue
  }), {})
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

export const isConfiguring = createSelector(
  status,
  (status) => _.includes(['pending','loading'], status)
)

export const isValid = createSelector(
  submittable,
  validated,
  errors,
  status,
  (fields, validated, errors, status) => status === 'validating' && Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.name)
  }) === undefined
)
