import SessionSerializer from '@apps/analytics/serializers/session_serializer'
import Session from '@apps/analytics/models/session'
import Event from '@apps/analytics/models/event'

const showRoute = async (req, res) => {

  const session = await Session.query(qb => {
    qb.select('sessions.*','session_details.*')
    qb.innerJoin('session_details','session_details.session_id','sessions.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['events'],
    transacting: req.analytics
  })

  if(!session) return res.status(404).respond({
    code: 404,
    message: 'Unable to load session'
  })

  const events = await Event.query(qb => {
    qb.select('events.*','event_details.*')
    qb.innerJoin('event_details','event_details.event_id','events.id')
    qb.whereNotIn('event_details.type', ['page_ping','track_maha'])
    qb.where('events.session_id', session.get('id'))
    qb.orderBy('events.tstamp', 'asc')
  }).fetchAll({
    transacting: req.analytics
  })

  session.set('events', events)

  res.status(200).respond(session, SessionSerializer)

}

export default showRoute
