export const set = (key, value) => ({
  type: 'SET',
  key,
  value
})

export const toggle = (id) => ({
  type: 'TOGGLE',
  id
})
