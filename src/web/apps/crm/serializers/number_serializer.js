const NumberSerializer = (req, result) => ({
  id: result.get('id'),
  number: result.get('number'),
  locality: result.get('locality'),
  region: result.get('region'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default NumberSerializer
