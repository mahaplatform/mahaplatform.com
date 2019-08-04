export const create = (cindex, value) => ({
  type: 'CREATE',
  cindex,
  value
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
