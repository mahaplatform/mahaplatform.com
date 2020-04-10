import TicketSerializer from '../../../../../serializers/ticket_serializer'
import Ticket from '../../../../../models/ticket'

const listRoute = async (req, res) => {

  const tickets = await Ticket.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_tickets.*,events_registration_totals.*'))
      qb.select(req.trx.raw('events_tickets.*,events_registration_totals.*,case when events_attendings is null then false else true end as is_checked'))
      qb.joinRaw('inner join events_registrations on events_registrations.id=events_tickets.registration_id and events_registrations.event_id=?', req.params.event_id)
      qb.joinRaw('left join events_attendings on events_attendings.ticket_id=events_tickets.id and events_attendings.session_id=?', req.params.session_id)
      qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_tickets.registration_id')
      qb.where('events_tickets.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['name'],
      search: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name',
      allowed: ['name']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(tickets, TicketSerializer)

}

export default listRoute
