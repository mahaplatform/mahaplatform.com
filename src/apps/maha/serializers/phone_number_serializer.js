const NumberSerializer = (req, result) => ({
  id: result.get('id'),
  type: result.get('type'),
  number: result.get('number'),
  formatted: result.get('formatted'),
  locality: result.get('locality'),
  region: result.get('region'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default NumberSerializer
