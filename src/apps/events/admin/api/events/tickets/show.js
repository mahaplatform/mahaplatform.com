import TicketSerializer from '../../../../serializers/ticket_serializer'
import Ticket from '../../../../models/ticket'

const showRoute = async (req, res) => {

  const ticket = await Ticket.query(qb => {
    qb.innerJoin('events_registrations','events_registrations.id','events_tickets.registration_id')
    qb.where('events_tickets.team_id', req.team.get('id'))
    qb.where('events_registrations.event_id', req.params.event_id)
    qb.where('events_tickets.id', req.params.id)
  }).fetch({
    withRelated: [],
    transacting: req.trx
  })

  if(!ticket) return res.status(404).respond({
    code: 404,
    message: 'Unable to load ticket'
  })

  res.status(200).respond(ticket, TicketSerializer)

}

export default showRoute
