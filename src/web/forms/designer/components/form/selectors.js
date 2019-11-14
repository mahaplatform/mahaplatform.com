import { createSelector } from 'reselect'
import _ from 'lodash'

const data = (state, props) => state.data

const given = (state, props) => props.fields

const status = (state, props) => state.status

export const fields = createSelector(
  given,
  status,
  (fields, status) => fields.map(field => ({
    ...field,
    status: status[field.name] || 'pending'
  }))
)

export const finalized = createSelector(
  data,
  (data) => Object.keys(data).reduce((finalized, key) => ({
    ...finalized,
    ...!_.isNil(data[key]) ? { [key]: data[key] } : {}
  }), {})
)

export const isFinalized = createSelector(
  fields,
  (fields) => fields.find(field => {
    return field.status !== 'finalized'
  }) === undefined
)

export const isReady = createSelector(
  fields,
  (fields) => fields.find(field => {
    return field.status === 'pending'
  }) === undefined
)

export const isValid = createSelector(
  fields,
  (fields) => fields.find(field => {
    return field.status !== 'valid'
  }) === undefined
)
