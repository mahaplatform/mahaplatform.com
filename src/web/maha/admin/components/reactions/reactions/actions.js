export const onReact = (table, id, reaction) => ({
  type: 'maha.reactions/REACT',
  table,
  id,
  reaction
})

export const onUnreact = (table, id, reaction) => ({
  type: 'maha.reactions/UNREACT',
  table,
  id,
  reaction
})
