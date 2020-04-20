import Event from '../../../models/event'

const editRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['organizers','sessions.location','ticket_types'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  res.status(200).respond({
    code: event.get('code'),
    title: event.get('title'),
    permalink: event.get('permalink'),
    description: event.get('description'),
    image_id: event.get('image_id'),
    contact_config: event.get('contact_config'),
    ticket_config: event.get('ticket_config'),
    payment_config: event.get('payment_config'),
    ticket_types: event.related('ticket_types').map(ticket_type => ({
      id: ticket_type.get('id'),
      name: ticket_type.get('name'),
      description: ticket_type.get('description'),
      project_id: ticket_type.get('project_id'),
      revenue_type_id: ticket_type.get('revenue_type_id'),
      price_type: ticket_type.get('price_type'),
      fixed_price: ticket_type.get('fixed_price'),
      low_price: ticket_type.get('low_price'),
      high_price: ticket_type.get('high_price'),
      tax_rate: ticket_type.get('tax_rate'),
      overage_strategy: ticket_type.get('overage_strategy'),
      donation_revenue_type_id: ticket_type.get('donation_revenue_type_id'),
      total_tickets: ticket_type.get('total_tickets'),
      max_per_order: ticket_type.get('max_per_order'),
      sales_open_at: ticket_type.get('sales_open_at'),
      sales_close_at: ticket_type.get('sales_close_at')
    })),
    sessions: event.related('sessions').map(session => ({
      id: session.get('id'),
      title: session.get('title'),
      description: session.get('description'),
      location: session.get('location_id') ? {
        id: session.related('location').get('id'),
        name: session.related('location').get('name'),
        address: session.related('location').get('address')
      } : null,
      is_online: session.get('is_online'),
      date: session.get('date'),
      start_time: session.get('start_time'),
      end_time: session.get('end_time'),
      starts_at: session.get('starts_at'),
      ends_at: session.get('ends_at')
    })),
    organizer_ids: event.get('organizer_ids')
  })

}

export default editRoute
