export const set = (transforms) => ({
  type: 'SET',
  transforms
})

export const popTransform = () => ({
  type: 'POP_TRANSFORM'
})

export const pushTransform = (key, value) => ({
  type: 'PUSH_TRANSFORM',
  key,
  value
})

export const setMode = (mode) => ({
  type: 'SET_MODE',
  mode
})

export const setRatio = (ratio) => ({
  type: 'SET_RATIO',
  ratio
})
