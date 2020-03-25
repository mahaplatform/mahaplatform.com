const vendorSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  address: result.get('address'),
  integration: result.get('integration'),
  items_count: result.get('items_count'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default vendorSerializer
