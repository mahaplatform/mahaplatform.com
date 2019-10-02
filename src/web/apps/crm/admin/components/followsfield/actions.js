export const add = (network) => ({
  type: 'ADD',
  network
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (networks) => ({
  type: 'SET',
  networks
})

export const update = (index, network) => ({
  type: 'UPDATE',
  index,
  network
})
