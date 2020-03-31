const TicketSerializer = (req, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  email: result.get('email'),
  code: result.get('code'),
  is_checked: result.get('is_checked'),
  ticket_type: ticket_type(result.related('ticket_type')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const ticket_type = (ticket_type) => {
  if(!ticket_type.id) return
  return {
    id: ticket_type.get('id'),
    name: ticket_type.get('name')
  }
}

export default TicketSerializer
