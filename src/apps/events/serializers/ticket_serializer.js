const TicketSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  email: result.get('email'),
  code: result.get('code'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default TicketSerializer
