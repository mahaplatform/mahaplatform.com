import TicketSerializer from '../../../../serializers/ticket_serializer'
import Ticket from '../../../../models/ticket'

const listRoute = async (req, res) => {

  const tickets = await Ticket.filterFetch({
    scope: (qb) => {
      qb.innerJoin('events_registrations','events_registrations.id','events_tickets.registration_id')
      qb.where('events_tickets.team_id', req.team.get('id'))
      qb.where('events_registrations.event_id', req.params.event_id)
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
