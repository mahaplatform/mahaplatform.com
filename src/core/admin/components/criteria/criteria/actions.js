export const create = (item) => ({
  type: 'CREATE',
  item
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const reset = () => ({
  type: 'RESET'
})

export const set = (items) => ({
  type: 'SET',
  items
})

export const test = (item) => ({
  type: 'TEST',
  item
})
