import { createSelector } from 'reselect'

const profiles = (state, props) => state.profiles || []

export const types = createSelector(
  profiles,
  (profiles) => profiles.reduce((types, profile) => ({
    ...types,
    [profile.type]: [
      ...types[profile.type] || [],
      profile
    ]
  }), { files: [], photos: [], contacts: [], email: [], posts: [], surveys: [] })
)
