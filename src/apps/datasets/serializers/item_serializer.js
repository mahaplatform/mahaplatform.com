const itemSerializer = (req, result) => ({
  id: result.get('id'),
  title: 'Foo',
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default itemSerializer
