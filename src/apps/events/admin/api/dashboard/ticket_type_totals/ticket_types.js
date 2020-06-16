import TicketTypeSerializer from '../../../../serializers/ticket_type_serializer'
import TicketType from '../../../../models/ticket_type'

const ticketTypesRoute = async (req, res) => {

  const ticket_types = await TicketType.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_ticket_types.*, coalesce(count(events_tickets.*), 0) as tickets_count'))
      qb.leftJoin('events_tickets', 'events_tickets.ticket_type_id','events_ticket_types.id')
      qb.groupBy('events_ticket_types.id')
      qb.where('events_ticket_types.team_id', req.team.get('id'))
      qb.where('events_ticket_types.event_id', req.params.event_id)
      qb.orderBy('delta', 'asc')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(ticket_types, TicketTypeSerializer)

}

export default ticketTypesRoute
