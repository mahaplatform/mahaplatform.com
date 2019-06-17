const profileSerializer = (req, result) => ({
  id: result.get('id'),
  network: result.related('source').get('text'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default profileSerializer
