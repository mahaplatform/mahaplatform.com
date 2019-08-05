const user_typeSerializer = (req, result) => ({
  id: result.get('id'),
  text: result.get('text'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default user_typeSerializer
