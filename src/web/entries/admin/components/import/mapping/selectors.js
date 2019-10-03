import { createSelector } from 'reselect'
import _ from 'lodash'

const required = (state, props) => props.fields.reduce((requiredFields, elem) => {
  return (elem.required === true) ? [...requiredFields, elem.name] : requiredFields
}, [])

export const mapped = (state, props) => state.mapping ? state.mapping.reduce((mapped, elem) => {
  return (elem.field !== null) ? [...mapped, elem.field] : mapped
}, []) : []

export const isValid = createSelector(
  mapped,
  required,
  (mapped, required) => required.reduce((isValid, field) => {
    return (!isValid) ? isValid : _.includes(mapped, field)
  }, true)
)
