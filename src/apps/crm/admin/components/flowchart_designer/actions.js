export const set = (steps) => ({
  type: 'SET',
  steps
})

export const add = (step) => ({
  type: 'ADD',
  step
})

export const edit = (code) => ({
  type: 'EDIT',
  code
})

export const remove = (step) => ({
  type: 'REMOVE',
  step
})

export const update = (code, config) => ({
  type: 'UPDATE',
  code,
  config
})
