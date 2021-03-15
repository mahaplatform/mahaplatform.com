const domainSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default domainSerializer
