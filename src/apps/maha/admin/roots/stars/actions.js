export const update = (table, id, starred) => ({
  type: 'UPDATE',
  table,
  id,
  starred
})
