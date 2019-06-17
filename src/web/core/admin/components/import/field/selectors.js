import { createSelector } from 'reselect'
import _ from 'lodash'

const fields = (state, props) => props.fields

const mapped = (state, props) => props.mapped

const config = (state, props) => state.config || {}

export const control = createSelector(
  fields,
  config,
  (fields, config) => _.find(fields, { name: config.field })
)

export const availableFields = createSelector(
  fields,
  mapped,
  config,
  (fields, mapped, config) => fields.filter(field => {
    return !_.includes(mapped, field.name) || field.name === config.field
  })
)
