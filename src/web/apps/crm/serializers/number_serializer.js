const NumberSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('number'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default NumberSerializer
