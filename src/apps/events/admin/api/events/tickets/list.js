import TicketSerializer from '@apps/events/serializers/ticket_serializer'
import Ticket from '@apps/events/models/ticket'
import Event from '@apps/events/models/event'

const listRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  const tickets = await Ticket.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_tickets.*,events_registration_totals.*'))
      qb.innerJoin('events_registrations','events_registrations.id','events_tickets.registration_id')
      qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_tickets.registration_id')
      qb.innerJoin('events_ticket_types','events_ticket_types.id','events_tickets.ticket_type_id')
      qb.where('events_tickets.team_id', req.team.get('id'))
      qb.where('events_registrations.event_id', event.get('id'))
    },
    aliases: {
      ticket_type: 'events_ticket_types.name',
      ...event.get('ticket_config').fields.reduce((aliases, field) => ({
        ...aliases,
        [field.code]: `values->>${field.code}`
      }), {})
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'created_at',
      allowed: ['created_at']
    },
    withRelated: ['ticket_type'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(tickets, TicketSerializer)

}

export default listRoute
