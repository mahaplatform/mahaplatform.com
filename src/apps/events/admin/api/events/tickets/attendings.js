import AttendingSerializer from '@apps/events/serializers/attending_serializer'
import Session from '@apps/events/models/session'

const listRoute = async (req, res) => {

  const sessions = await Session.query(qb => {
    qb.select(req.trx.raw('events_sessions.*,case when events_attendings is null then false else true end as is_checked'))
    qb.joinRaw('left join events_attendings on events_attendings.session_id=events_sessions.id and events_attendings.ticket_id=?', req.params.ticket_id)
    qb.where('events_sessions.event_id', req.params.event_id)
    qb.where('events_sessions.team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['location'],
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(sessions, AttendingSerializer)

}

export default listRoute
