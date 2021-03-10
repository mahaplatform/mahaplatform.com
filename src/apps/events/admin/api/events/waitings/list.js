import WaitingSerializer from '@apps/events/serializers/waiting_serializer'
import Event from '@apps/events/models/event'

const listRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    withRelated: ['waitings'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  await res.status(200).respond(event.related('waitings'), WaitingSerializer)

}

export default listRoute
