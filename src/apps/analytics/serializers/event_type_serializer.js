const event_typeSerializer = (req, result) => ({
  id: result.get('id'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default event_typeSerializer
