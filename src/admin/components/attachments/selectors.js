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
    [file.source_id]: (counts[file.service] || 0) + 1
  }), {})
)

export const processed = createSelector(
  files,
  (files) => files.find((file) => {
    return file.asset === undefined
  }) === undefined
)

export const retry = createSelector(
  files,
  (files) => files.find((file) => {
    return file.status === 'failed'
  }) !== undefined
)
