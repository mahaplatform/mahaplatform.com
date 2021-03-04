export const clear = ()=> ({
  type: 'CLEAR'
})

export const close = ()=> ({
  type: 'CLOSE'
})

export const open = ()=> ({
  type: 'OPEN'
})

export const choose = (color)=> ({
  type: 'CHOOSE',
  color
})

export const type = (value)=> ({
  type: 'TYPE',
  value
})
