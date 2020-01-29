export const add = (index, block) => ({
  type: 'ADD',
  index,
  block
})

export const clone = (index) => ({
  type: 'CLONE',
  index
})

export const edit = (index) => ({
  type: 'EDIT',
  index
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
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
