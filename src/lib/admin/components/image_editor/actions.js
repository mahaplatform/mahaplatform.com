export const set = (transforms) => ({
  type: 'SET',
  transforms
})

export const reset = () => ({
  type: 'RESET'
})

export const undo = () => ({
  type: 'UNDO'
})

export const redo = () => ({
  type: 'REDO'
})

export const crop = (cropping) => ({
  type: 'CROP',
  cropping
})

export const setRatio = (ratio) => ({
  type: 'SET_RATIO',
  ratio
})

export const popTransform = () => ({
  type: 'POP_TRANSFORM'
})

export const pushTransform = (key, value) => ({
  type: 'PUSH_TRANSFORM',
  key,
  value
})


export const setTransforms = (transforms) => ({
  type: 'SET_TRANSFORMS',
  transforms
})
