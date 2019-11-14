import { createSelector } from 'reselect'

const fields = (state, props) => props.fields

const ready = (state, props) => state.ready

export const isReady = createSelector(
  fields,
  ready,
  (fields, ready) => fields.find(field => {
    return !ready.includes(field.name)
  }) === undefined
)
