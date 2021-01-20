const categorySerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  products_count: result.get('products_count'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default categorySerializer
