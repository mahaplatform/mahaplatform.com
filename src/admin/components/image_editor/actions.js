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
