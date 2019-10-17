export const set = (steps) => ({
  type: 'SET',
  steps
})

export const add = (step) => ({
  type: 'ADD',
  step
})

export const remove = (step) => ({
  type: 'REMOVE',
  step
})
