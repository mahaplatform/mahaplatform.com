import { createSelector } from 'reselect'

const sources = (state, props) => state.sources || []

const active = (state, props) => state.active

const files = (state, props) => state.files || []

export const source = createSelector(
  sources,
  active,
  (sources, active) => (active !== null) ? sources[active] : null
)

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
