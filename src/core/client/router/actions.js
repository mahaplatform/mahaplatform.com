export const pop = () => ({
  type: 'POP'
})

export const push = (route) => ({
  type: 'PUSH',
  route
})

export const replace = (route) => ({
  type: 'REPLACE',
  route
})
