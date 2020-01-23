export const add = (index, field) => ({
  type: 'ADD',
  index,
  field
})

export const set = (config) => ({
  type: 'SET',
  config
})

export const toggle = () => ({
  type: 'TOGGLE'
})
