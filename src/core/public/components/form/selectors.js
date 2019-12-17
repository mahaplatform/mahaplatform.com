import { createSelector } from 'reselect'
import _ from 'lodash'

const busy = (state, props) => state.busy

const errors = (state, props) => state.errors

const fields = (state, props) => props.fields

const ready = (state, props) => state.ready

const validated = (state, props) => state.validated

export const isBusy = createSelector(
  busy,
  (busy) => busy.length > 0
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
