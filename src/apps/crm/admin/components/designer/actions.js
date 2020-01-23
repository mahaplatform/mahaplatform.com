export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})

export const addSection = (section) => ({
  type: 'ADD_SECTION',
  section
})

export const deleteSection = (index) => ({
  type: 'DELETE_SECTION',
  index
})

export const moveSection = (from, to) => ({
  type: 'MOVE_SECTION',
  from,
  to
})

export const add = (section, index, block) => ({
  type: 'ADD',
  section,
  index,
  block
})

export const clone = (section, block) => ({
  type: 'CLONE',
  section,
  block
})

export const edit = (section, block) => ({
  type: 'EDIT',
  section,
  block
})

export const remove = (section, block) => ({
  type: 'REMOVE',
  section,
  block
})

export const set = (config) => ({
  type: 'SET',
  config
})

export const toggle = () => ({
  type: 'TOGGLE'
})
