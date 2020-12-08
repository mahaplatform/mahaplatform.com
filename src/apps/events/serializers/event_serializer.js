const EventSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  code: result.get('code'),
  permalink: result.get('permalink'),
  url: result.get('url'),
  description: result.get('description'),
  image: result.related('image') ? result.related('image').get('path') : null,
  contact_config: result.get('contact_config'),
  ticket_config: result.get('ticket_config'),
  payment_config: result.get('payment_config'),
  organizers: result.related('organizers').map(organizer),
  program: program(result.related('program')),
  start_date: result.get('start_date'),
  end_date: result.get('end_date'),
  ticket_types: result.related('ticket_types').map(ticket_type),
  registrations_count: result.get('registrations_count'),
  tickets_count: result.get('tickets_count'),
  waitings_count: result.get('waitings_count'),
  revenue: result.get('revenue'),
  first_registration: result.get('first_registration'),
  last_registration: result.get('last_registration'),
  deleted_at: result.get('deleted_at'),
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
    title: program.get('title'),
    logo: program.related('logo') ? program.related('logo').get('path') : null
  }
}

const ticket_type = (ticket_type) => {
  if(!ticket_type.id) return
  return {
    id: ticket_type.get('id'),
    delta: ticket_type.get('delta'),
    is_active: ticket_type.get('is_active'),
    name: ticket_type.get('name'),
    description: ticket_type.get('description'),
    price_type: ticket_type.get('price_type'),
    fixed_price: ticket_type.get('fixed_price'),
    low_price: ticket_type.get('low_price'),
    high_price: ticket_type.get('high_price'),
    tax_rate: ticket_type.get('tax_rate'),
    total_tickets: ticket_type.get('total_tickets'),
    max_per_order: ticket_type.get('max_per_order'),
    remaining: ticket_type.get('remaining'),
    tickets_count: ticket_type.get('tickets_count'),
    sales_open_at: ticket_type.get('sales_open_at'),
    sales_close_at: ticket_type.get('sales_close_at')
  }
}

export default EventSerializer
