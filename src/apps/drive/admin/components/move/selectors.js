import { createSelector } from 'reselect'

const foldersSelector = (state, props) => state.folders

export const folder = createSelector(
  foldersSelector,
  (folders) => folders[folders.length - 1]
)
