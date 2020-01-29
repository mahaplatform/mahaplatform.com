export const add = (index, block) => ({
  type: 'ADD',
  index,
  block
})

export const clone = (block) => ({
  type: 'CLONE',
  block
})

export const edit = (block) => ({
  type: 'EDIT',
  block
})

export const remove = (block) => ({
  type: 'REMOVE',
  block
})

export const set = (config) => ({
  type: 'SET',
  config
})

export const toggle = () => ({
  type: 'TOGGLE'
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
