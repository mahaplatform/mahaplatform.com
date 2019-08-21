export const add = () => ({
  type: 'ADD'
})

export const update = (index, value) => ({
  type: 'UPDATE',
  index,
  value
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (emails) => ({
  type: 'SET',
  emails
})
