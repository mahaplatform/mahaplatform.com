import SessionSerializer from '@apps/events/serializers/session_serializer'
import Session from '@apps/events/models/session'

const showRoute = async (req, res) => {

  const session = await Session.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('event_id', req.params.event_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['location'],
    transacting: req.trx
  })

  if(!session) return res.status(404).respond({
    code: 404,
    message: 'Unable to load session'
  })

  res.status(200).respond(session, SessionSerializer)

}

export default showRoute
