export const choose = (value)=> ({
  type: 'CHOOSE',
  value
})

export const clear = () => ({
  type: 'CLEAR'
})

export const query = (q) => ({
  type: 'QUERY',
  q
})

export const set = (value) => ({
  type: 'SET',
  value
})

export const setStreet2 = (value) => ({
  type: 'SET_STREET2',
  value
})

export const setOptions = (options) => ({
  type: 'SET_OPTIONS',
  options
})
