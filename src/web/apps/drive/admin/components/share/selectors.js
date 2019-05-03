import { createSelector } from 'reselect'

const methods = (state, props) => state.methods

const active = (state, props) => state.active

export const method = createSelector(
  methods,
  active,
  (methods, active) => (active !== null) ? methods[active] : null
)
