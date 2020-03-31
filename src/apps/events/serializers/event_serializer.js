const EventSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  organizers: result.related('organizers').map(organizer),
  program: program(result.related('program')),
  ticket_types: result.related('ticket_types').map(ticket_type),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const organizer = (organizer) => {
  if(!organizer.id) return
  return {
    id: organizer.get('id'),
    name: organizer.get('name'),
    email: organizer.get('email'),
    phone: organizer.get('phone'),
    photo: organizer.related('photo') ? organizer.related('photo').get('path') : null
  }
}

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

const ticket_type = (ticket_type) => {
  if(!ticket_type.id) return
  return {
    id: ticket_type.get('id'),
    name: ticket_type.get('name'),
    price_type: ticket_type.get('price_type'),
    fixed_price: ticket_type.get('fixed_price'),
    low_price: ticket_type.get('low_price'),
    high_price: ticket_type.get('high_price'),
    total_tickets: ticket_type.get('total_tickets'),
    max_per_order: ticket_type.get('max_per_order'),
    sales_open_at: ticket_type.get('sales_open_at'),
    sales_close_at: ticket_type.get('sales_close_at')
  }
}

export default EventSerializer
