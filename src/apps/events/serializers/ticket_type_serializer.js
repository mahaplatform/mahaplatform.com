const TicketTypeSerializer = (req, ticket_type) => ({
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
  sales_close_at: ticket_type.get('sales_close_at'),
  created_at: ticket_type.get('created_at'),
  updated_at: ticket_type.get('updated_at')
})

export default TicketTypeSerializer
