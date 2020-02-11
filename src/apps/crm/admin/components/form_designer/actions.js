export const save = (endpoint, config) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint,
  body: { config },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

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
