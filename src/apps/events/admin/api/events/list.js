import EventSerializer from '../../../serializers/event_serializer'
import Event from '../../../models/event'

const listRoute = async (req, res) => {

  const events = await Event.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_events.*,events_event_totals.*'))
      qb.innerJoin('events_event_totals','events_event_totals.event_id','events_events.id')
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['title']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(events, EventSerializer)

}

export default listRoute
