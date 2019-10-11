const FaxSerializer = (req, result) => ({
  id: result.get('id'),
  to: result.get('to'),
  from: result.related('number').get('number'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default FaxSerializer
