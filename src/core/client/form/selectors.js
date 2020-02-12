import { createSelector } from 'reselect'
import _ from 'lodash'

const fields = (state, props) => props.fields

const errors = (state, props) => state.errors

const ready = (state, props) => state.ready

const status = (state, props) => state.status

const validated = (state, props) => state.validated

export const submittable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return !_.includes(['text'], field.type) && field.disabled !== true
  })
)

export const isActive = createSelector(
  status,
  (status) => _.includes(['ready','validating','submitting','failure'], status)
)

export const isReady = createSelector(
  submittable,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.name)
  }) === undefined
)

export const isValid = createSelector(
  submittable,
  validated,
  errors,
  (fields, validated, errors) => Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.name)
  }) === undefined
)
