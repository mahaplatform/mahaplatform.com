import TicketSerializer from '@apps/events/serializers/ticket_serializer'
import Registration from '@apps/events/models/registration'

const ticketsRoute = async (req, res) => {

  const registration = await Registration.query(qb => {
    qb.select(req.trx.raw('events_registrations.*,events_registration_totals.is_paid'))
    qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_registrations.id')
    qb.where('events_registrations.team_id', req.team.get('id'))
    qb.where('events_registrations.event_id', req.params.event_id)
    qb.where('events_registrations.id', req.params.id)
  }).fetch({
    withRelated: ['tickets.ticket_type'],
    transacting: req.trx
  })

  if(!registration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load registration'
  })

  await res.status(200).respond(registration.related('tickets'), TicketSerializer)

}

export default ticketsRoute
