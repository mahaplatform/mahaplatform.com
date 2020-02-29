export const save = (endpoint, steps) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint,
  body: { steps },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

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

export const hover = (hovering) => ({
  type: 'HOVER',
  hovering
})

export const move = (code, parent, answer, delta) => ({
  type: 'MOVE',
  code,
  parent,
  answer,
  delta
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
