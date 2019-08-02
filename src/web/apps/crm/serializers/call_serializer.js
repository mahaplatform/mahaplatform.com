const CallSerializer = (req, result) => ({
  id: result.get('id'),
  date: result.get('date'),
  time: result.get('time'),
  description: result.get('description'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default CallSerializer
