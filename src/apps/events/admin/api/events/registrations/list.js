import RegistrationSerializer from '../../../../serializers/Registration_serializer'
import Event from '../../../../models/event'

const listRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    withRelated: ['registrations'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  res.status(200).respond(event.related('registrations'), RegistrationSerializer)

}

export default listRoute
