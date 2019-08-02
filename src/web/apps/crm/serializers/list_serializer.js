const ListSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  description: result.get('description'),
  type: result.get('type'),
  criteria: result.get('criteria'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default ListSerializer
