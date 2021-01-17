import { createSelector } from 'reselect'
import _ from 'lodash'

export const asset = (state, props) => props.asset

export const transforms = (state, props) => state.transforms

export const image = createSelector(
  asset,
  (asset) => asset.metadata
)

export const orientation = createSelector(
  transforms,
  (transforms) => {
    return transforms.filter(transform => {
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
    const [ top, left, width, height ] = crop.split(',').map(value => parseInt(value))
    const ratio = width / height
    return { top, left, width, height, ratio }
  }
)
