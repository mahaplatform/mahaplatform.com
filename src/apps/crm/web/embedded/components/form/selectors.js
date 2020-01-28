import { createSelector } from 'reselect'
import _ from 'lodash'

const config = (state, props) => props.config

const errors = (state, props) => state.errors

const ready = (state, props) => state.ready

const status = (state, props) => state.status

const validated = (state, props) => state.validated

export const fields = createSelector(
  config,
  status,
  (config, status) => config.fields.map(field => ({
    ...field,
    status: status[field.name] || 'pending'
  }))
)

export const requiresPayment = createSelector(
  fields,
  (fields) => fields.find(field => {
    return field.type === 'productfield'
  }) !== undefined
)

export const isReady = createSelector(
  fields,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.name)
  }) === undefined
)

export const isValid = createSelector(
  fields,
  validated,
  errors,
  (fields, validated, errors) => Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.name)
  }) === undefined
)
