import { activity } from '@core/services/routes/activities'
import SessionSerializer from '@apps/events/serializers/session_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Session from '@apps/events/models/session'

const updateRoute = async (req, res) => {

  const session = await Session.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await session.save({
    ...whitelist(req.body, ['title','location_id','is_online','date','start_time','end_time'])
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: session
  })

  await socket.refresh(req, [
    '/admin/events/events',
    `/admin/events/events/${session.get('event_id')}/sessions/${session.get('id')}`
  ])

  res.status(200).respond(session, SessionSerializer)

}

export default updateRoute
