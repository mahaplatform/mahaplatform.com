export const add = (rule) => ({
  type: 'ADD',
  rule
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const update = (index, rule) => ({
  type: 'REMOVE',
  index,
  rule
})

export const set = (rules) => ({
  type: 'SET',
  rules
})
