export const add = (product) => ({
  type: 'ADD',
  product
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (products) => ({
  type: 'SET',
  products
})

export const update = (index, key, value) => ({
  type: 'UPDATE',
  index,
  key,
  value
})
