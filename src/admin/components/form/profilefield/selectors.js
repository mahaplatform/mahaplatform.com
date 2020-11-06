import { createSelector } from 'reselect'

const profiles = (state, props) => state.profiles || []

const selected = (state, props) => state.selected

export const profile = createSelector(
  profiles,
  selected,
  (profiles, selected) => selected !== null ? profiles[selected] : null
)
