export const create = (cindex, value) => ({
  type: 'CREATE',
  cindex,
  value
})

export const remove = (cindex) => ({
  type: 'REMOVE',
  cindex
})

export const set = (id, criteria) => ({
  type: 'SET',
  id,
  criteria
})

export const update = (cindex, value) => ({
  type: 'UPDATE',
  cindex,
  value
})

export const reset = () => ({
  type: 'RESET'
})
