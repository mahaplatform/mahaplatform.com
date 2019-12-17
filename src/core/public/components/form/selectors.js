import { createSelector } from 'reselect'
import _ from 'lodash'

const busy = (state, props) => state.busy

const errors = (state, props) => state.errors

const fields = (state, props) => props.fields

const ready = (state, props) => state.ready

const validated = (state, props) => state.validated

const submitable = createSelector(
  fields,
  (fields) => fields.filter(field => {
    return !_.includes(['fields','text','recaptcha'], field.type)
  })
)

export const isBusy = createSelector(
  busy,
  (busy) => busy.length > 0
)

export const isReady = createSelector(
  submitable,
  ready,
  (fields, ready) => fields.find(field => {
    return !_.includes(ready, field.name)
  }) === undefined
)

export const isValid = createSelector(
  submitable,
  validated,
  errors,
  (fields, validated, errors) => Object.keys(errors).length === 0 && fields.find(field => {
    return !_.includes(validated, field.name)
  }) === undefined
)
