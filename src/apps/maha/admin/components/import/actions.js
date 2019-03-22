export const pushCard = (card) => ({
  type: 'PUSH_CARD',
  card
})

export const popCard = () => ({
  type: 'POP_CARD'
})

export const setImport = (imp) => ({
  type: 'SET_IMPORT',
  import: imp
})
