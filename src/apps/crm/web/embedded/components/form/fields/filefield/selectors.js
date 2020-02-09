import { createSelector } from 'reselect'

const files = (state, props) => state.files

export const value = createSelector(
  files,
  (files) => files.filter(file => {
    return file.asset !== undefined
  }).map(file => ({
    ...file.asset
  }))
)
