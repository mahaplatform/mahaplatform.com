export const create = (cindex, value) => ({
  type: 'CREATE',
  cindex,
  value
})

export const remove = (cindex) => ({
  type: 'REMOVE',
  cindex
})

export const reset = () => ({
  type: 'RESET'
})

export const set = (filter, criteria) => ({
  type: 'SET',
  filter,
  criteria
})

export const test = (mode, cindex, value) => ({
  type: 'TEST',
  mode,
  cindex,
  value
})

export const update = (cindex, value) => ({
  type: 'UPDATE',
  cindex,
  value
})
