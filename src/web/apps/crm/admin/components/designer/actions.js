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
