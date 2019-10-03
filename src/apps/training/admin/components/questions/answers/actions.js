export const add = () => ({
  type: 'ADD'
})

export const choose = (index) => ({
  type: 'CHOOSE',
  index
})

export const move = (from, to) => ({
  type: 'MOVE',
  from,
  to
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (answers) => ({
  type: 'SET',
  answers
})

export const update = (index, value) => ({
  type: 'UPDATE',
  index,
  value
})
