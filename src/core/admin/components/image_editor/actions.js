export const set = (transforms) => ({
  type: 'SET',
  transforms
})

export const adjust = (key, value) => ({
  type: 'ADJUST',
  key,
  value
})

export const crop = (cropping) => ({
  type: 'CROP',
  cropping
})

export const setRatio = (ratio) => ({
  type: 'SET_RATIO',
  ratio
})
