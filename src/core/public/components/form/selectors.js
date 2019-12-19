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

export const isValidated =  createSelector(
  submitable,
  validated,
  (fields, validated) => fields.find(field => {
    return !_.includes(validated, field.name)
  }) === undefined
)

export const isValid = createSelector(
  errors,
  (errors) => Object.keys(errors).length === 0 
)
