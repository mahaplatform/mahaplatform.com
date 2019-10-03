export const setMode = (mode) => ({
  type: 'SET_MODE',
  mode
})

export const choose = (index) => ({
  type: 'CHOOSE',
  index
})

export const toggleHelp = () => ({
  type: 'TOGGLE_HELP'
})

export const updateUnseen = (unseen) => ({
  type: 'UPDATE_UNSEEN',
  unseen
})
