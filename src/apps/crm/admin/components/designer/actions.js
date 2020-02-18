export const save = (endpoint, config) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint,
  body: { config },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const add = (section, index, block) => ({
  type: 'ADD',
  section,
  index,
  block
})

export const clone = (section, index) => ({
  type: 'CLONE',
  section,
  index
})

export const edit = (section, index) => ({
  type: 'EDIT',
  section,
  index
})

export const remove = (section, index) => ({
  type: 'REMOVE',
  section,
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
