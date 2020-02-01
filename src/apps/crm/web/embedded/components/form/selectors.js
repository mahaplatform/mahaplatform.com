import { createSelector } from 'reselect'
import _ from 'lodash'

const config = (state, props) => props.config

const data = (state, props) => state.data

const errors = (state, props) => state.errors

const ready = (state, props) => state.ready

const status = (state, props) => state.status

const validated = (state, props) => state.validated

export const fields = createSelector(
  config,
  data,
  (config, data) => config.fields.filter(field => {
    const rule = config.rules.rules.find(rule => {
      return rule.then_code === field.code
    })
    if(!rule) return true
    const value = data[rule.if_code]
    const show = rule.action === 'show'
    if(!value) {
      return rule.comparison === '$nl' ? show : !show
    } else if(rule.comparison === '$nnl') {
      return value !== null ? show : !show
    } else if(rule.comparison === '$eq') {
      return value === rule.value ? show : !show
    } else if(rule.comparison === '$neq') {
      return value !== rule.value ? show : !show
    } else if(rule.comparison === '$ct') {
      return value.search(rule.value) > -1 ? show : !show
    } else if(rule.comparison === '$nct') {
      return value.search(rule.value) < 0 ? show : !show
    } else if(rule.comparison === '$in') {
      return _.includes(rule.value, value) ? show : !show
    } else if(rule.comparison === '$nin') {
      return !_.includes(rule.value, value) ? show : !show
    }
  })
)

const submittable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return !_.includes(['text'], field.type)
  })
)

export const requiresPayment = createSelector(
  submittable,
  (fields) => fields.find(field => {
    return field.type === 'productfield'
  }) !== undefined
)

export const isActive = createSelector(
  status,
  (status) => _.includes(['ready','validating','submitting','failure'], status)
)

export const isReady = createSelector(
  submittable,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.code)
  }) === undefined
)

export const isValid = createSelector(
  submittable,
  validated,
  errors,
  (fields, validated, errors) => Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.code)
  }) === undefined
)

export const summary = createSelector(
  submittable,
  data,
  (fields, data) => {
    const productfield = fields.find(field => {
      return field.type === 'productfield'
    })
    return productfield ? data[productfield.code] : null
  }
)
