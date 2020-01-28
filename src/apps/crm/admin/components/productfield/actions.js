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
