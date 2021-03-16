const recordSerializer = (req, result) => ({
  id: result.get('id'),
  is_system: result.get('is_system'),
  name: result.get('name'),
  type: result.get('type'),
  ttl: result.get('ttl'),
  alias: result.get('alias'),
  value: result.get('value'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default recordSerializer
