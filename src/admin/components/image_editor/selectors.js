import { createSelector } from 'reselect'
import _ from 'lodash'

export const asset = (state, props) => props.asset

export const transforms = (state, props) => state.transforms

export const canvas = (state, props) => ({
  width: 615,
  height: 615
})

export const image = createSelector(
  asset,
  (asset) => ({
    ...asset.metadata,
    mode: (asset.metadata.width >= asset.metadata.height) ? 'landscape' : 'portrait'
  })
)

export const orientation = createSelector(
  transforms,
  image,
  (transforms, image) => {
    const orientation = transforms.filter(transform => {
      return _.includes(['rot','flip'], transform.key)
    }).reduce((state, transform) => {
      const { key, value } = transform
      const fliph = (state.rot % 180 === 0 && value === 'h') || (state.rot % 180 === 90 && value === 'v')
      return {
        ...state,
        ...key !== 'rot' ? {} : { rot: state.rot + value },
        ...key !== 'flip' ? {} : fliph ? { h: state.h + 180 } : { v: state.v + 180 }
      }
    }, { h: 0, v: 0, rot: 0 })
    return {
      ...orientation,
      mode: (orientation.rot % 180 === 0 && image.mode === 'landscape') || (orientation.rot % 180 === 90 && image.model === 'portrait') ? 'landscape' : 'portrait'
    }
  }
)

export const crop = createSelector(
  image,
  transforms,
  (image, transforms) => {
    const index = _.findLastIndex(transforms, (transform) => {
      return transform.key === 'crop'
    })
    const crop = index >= 0 ? transforms[index].value : `0,0,${image.width},${image.height}`
    const [ left, top, width, height ] = crop.split(',').map(value => parseInt(value))
    const ratio = width / height
    return { left, top, width, height, ratio }
  }
)
