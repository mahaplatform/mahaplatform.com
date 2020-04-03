import TicketSerializer from '../../../../serializers/ticket_serializer'
import Registration from '../../../../models/registration'

const ticketsRoute = async (req, res) => {

  const registration = await Registration.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('event_id', req.params.event_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['tickets.ticket_type'],
    transacting: req.trx
  })

  if(!registration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load registration'
  })

  res.status(200).respond(registration.related('tickets'), TicketSerializer)

}

export default ticketsRoute
