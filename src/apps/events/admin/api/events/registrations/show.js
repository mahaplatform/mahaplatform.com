import RegistrationSerializer from '@apps/events/serializers/registration_serializer'
import Registration from '@apps/events/models/registration'

const showRoute = async (req, res) => {

  const registration = await Registration.query(qb => {
    qb.select(req.trx.raw('events_registrations.*,events_registration_totals.*'))
    qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_registrations.id')
    qb.where('events_registrations.team_id', req.team.get('id'))
    qb.where('events_registrations.event_id', req.params.event_id)
    qb.where('events_registrations.id', req.params.id)
  }).fetch({
    withRelated: ['contact','enrollment'],
    transacting: req.trx
  })

  if(!registration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load registration'
  })

  res.status(200).respond(registration, RegistrationSerializer)

}

export default showRoute
