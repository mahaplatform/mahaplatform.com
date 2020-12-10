const TicketSerializer = (req, result) => ({
  id: result.get('id'),
  name: result.get('name'),
  code: result.get('code'),
  is_checked: result.get('is_checked'),
  ticket_type: ticket_type(result.related('ticket_type')),
  is_paid: result.get('is_paid'),
  eticket: result.get('eticket'),
  values: result.get('values'),
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
