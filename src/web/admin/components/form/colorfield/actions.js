export const begin = ()=> ({
  type: 'BEGIN'
})

export const clear = ()=> ({
  type: 'CLEAR'
})

export const set = (color)=> ({
  type: 'SET',
  color
})
