export const add = (cindex) => ({
  type: 'ADD',
  cindex
})

export const cancel = () => ({
  type: 'CANCEL'
})

export const create = (cindex, value) => ({
  type: 'CREATE',
  cindex,
  value
})

export const edit = (cindex, criterion) => ({
  type: 'EDIT',
  cindex,
  criterion
})

export const remove = (cindex) => ({
  type: 'REMOVE',
  cindex
})

export const set = (criteria) => ({
  type: 'SET',
  criteria
})

export const update = (cindex, value) => ({
  type: 'UPDATE',
  cindex,
  value
})
