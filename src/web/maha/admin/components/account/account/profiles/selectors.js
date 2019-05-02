import { createSelector } from 'reselect'

const profilesSelector = (state, props) => state.profiles || []

export const profileList = createSelector(
  profilesSelector,
  (profiles) => profiles.reduce((list, profile) => [
    ...list,
    profile.network
  ], [])
)
