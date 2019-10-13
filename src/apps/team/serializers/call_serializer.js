const CallSerializer = (req, result) => ({
  id: result.get('id'),
  to: result.related('to').get('formatted'),
  from: result.related('from').get('formatted'),
  type: result.get('type'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})


export default CallSerializer
