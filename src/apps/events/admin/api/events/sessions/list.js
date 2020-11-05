import SessionSerializer from '@apps/events/serializers/session_serializer'
import Event from '@apps/events/models/event'

const listRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    withRelated: ['sessions.location'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  res.status(200).respond(event.related('sessions'), SessionSerializer)

}

export default listRoute
