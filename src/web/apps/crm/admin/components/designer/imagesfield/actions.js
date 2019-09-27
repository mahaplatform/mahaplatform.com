export const add = (images) => ({
  type: 'ADD',
  images
})

export const set = (images) => ({
  type: 'SET',
  images
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const update = (index, transforms) => ({
  type: 'UPDATE',
  index,
  transforms
})
