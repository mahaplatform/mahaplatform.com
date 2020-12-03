const versionSerializer = (req, result) => ({
  id: result.get('id'),
  value: result.get('value'),
  is_published: result.get('is_published'),
  published_at: result.get('published_at'),
  unpublished_at: result.get('unpublished_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default versionSerializer
