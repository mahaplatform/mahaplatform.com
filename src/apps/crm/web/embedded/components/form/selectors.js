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
  (config, status) => config.fields
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
    return data[productfield.code]
  }
)
