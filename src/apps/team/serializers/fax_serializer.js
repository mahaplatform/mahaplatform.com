const FaxSerializer = (req, result) => ({
  id: result.get('id'),
  to: result.get('type') === 'outbound' ? result.get('to') : result.related('number').get('number'),
  from: result.get('type') === 'outbound' ? result.related('number').get('number') : result.get('from'),
  type: result.get('type'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default FaxSerializer
