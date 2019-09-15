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

export const images = createSelector(
  files,
  (files) => files.filter(file => {
    return file.thumbnail !== null
  })
)

export const plains = createSelector(
  files,
  (files) => files.filter(file => {
    return file.thumbnail === null
  })
)
export const counts = createSelector(
  files,
  (files) => files.reduce((counts, file) => ({
    ...counts,
    [file.network]: (counts[file.network] || 0) + 1
  }), {})
)
