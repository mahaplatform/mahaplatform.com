import { createSelector } from 'reselect'

const assets = (state, props) => state.assets || []

export const images = createSelector(
  assets,
  (assets) => assets.filter(asset => asset.content_type.match(/(jpeg|jpg|png|gif)/))
)

export const plains = createSelector(
  assets,
  (assets) => assets.filter(asset => !asset.content_type.match(/(jpeg|jpg|png|gif)/))
)
