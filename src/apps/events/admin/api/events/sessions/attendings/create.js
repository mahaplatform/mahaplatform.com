import TicketSerializer from '@apps/events/serializers/ticket_serializer'
import socket from '@core/services/routes/emitter'
import Attending from '@apps/events/models/attending'
import Ticket from '@apps/events/models/ticket'

const createRoute = async (req, res) => {

  const ticket = await Ticket.query(qb => {
    qb.innerJoin('events_registrations', 'events_registrations.id', 'events_tickets.registration_id')
    qb.where('events_tickets.team_id', req.team.get('id'))
    qb.where('events_registrations.event_id', req.params.event_id)
    qb.where('events_tickets.code', req.body.code)
  }).fetch({
    transacting: req.trx
  })

  if(!ticket) return res.status(404).respond({
    code: 404,
    message: 'Unable to load ticket'
  })

  const attending = await Attending.query(qb => {
    qb.where('ticket_id', ticket.get('id'))
    qb.where('session_id', req.params.session_id)
  }).fetch({
    transacting: req.trx
  })

  if(attending) return res.status(500).respond({
    code: 500,
    message: 'This ticket has already been scanned'
  })

  await Attending.forge({
    team_id: req.team.get('id'),
    ticket_id: ticket.get('id'),
    session_id: req.params.session_id,
    method: 'scan'
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/events/events/${req.params.event_id}/sessions/${req.params.session_id}`
  ])

  res.status(200).respond(ticket, TicketSerializer)

}

export default createRoute
