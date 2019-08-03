export const add = (cindex, value) => ({
  type: 'ADD',
  cindex,
  value
})

export const begin = () => ({
  type: 'BEGIN'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const end = () => ({
  type: 'END'
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
