export const add = (index, field) => ({
  type: 'ADD',
  index,
  field
})

export const clone = (field) => ({
  type: 'CLONE',
  field
})

export const edit = (field) => ({
  type: 'EDIT',
  field
})

export const remove = (field) => ({
  type: 'REMOVE',
  field
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
