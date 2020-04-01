import EventSerializer from '../../../serializers/event_serializer'
import Event from '../../../models/event'

const showRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.select(req.trx.raw('events_events.*,events_event_totals.*'))
    qb.innerJoin('events_event_totals','events_event_totals.event_id','events_events.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email','organizers.photo','program','ticket_types','workflow'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  res.status(200).respond(event, EventSerializer)

}

export default showRoute
