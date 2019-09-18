import { createSelector } from 'reselect'

const files = (state, props) => state.files || []

export const assets = createSelector(
  files,
  (files) => files.reduce((assets, file) => {
    if(!file.asset) return assets
    return [
      ...assets,
      file.asset
    ]
  }, [])
)

export const counts = createSelector(
  files,
  (files) => files.reduce((counts, file) => ({
    ...counts,
    [file.service]: (counts[file.service] || 0) + 1
  }), {})
)
