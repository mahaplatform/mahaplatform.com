const typeSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  name: result.get('name'),
  description: result.get('description'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default typeSerializer
