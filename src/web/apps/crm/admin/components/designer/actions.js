export const changeViewport = (key, value) => ({
  type: 'CHANGE_VIEWPORT',
  key,
  value
})

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

export const add = (section, block) => ({
  type: 'ADD',
  section,
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

export const editable = (editable) => ({
  type: 'EDITABLE',
  editable
})
