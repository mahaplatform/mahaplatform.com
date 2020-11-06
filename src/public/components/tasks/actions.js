export const open = (tasks) => ({
  type: 'OPEN',
  tasks
})

export const close = () => ({
  type: 'CLOSE'
})

export const clear = () => ({
  type: 'CLEAR'
})
