export const onStar = (table, id) => ({
  type: 'maha.stars/STAR',
  table,
  id
})

export const onUnstar = (table, id) => ({
  type: 'maha.stars/UNSTAR',
  table,
  id
})
