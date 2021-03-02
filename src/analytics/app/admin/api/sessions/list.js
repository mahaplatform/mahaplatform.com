import SessionSerializer from '@apps/analytics/serializers/session_serializer'
import Session from '@apps/analytics/models/session'

const listRoute = async (req, res) => {

  const sessions = await Session.filterFetch({
    scope: (qb) => {
      qb.select('sessions.*','session_details.*')
      qb.innerJoin('session_details','session_details.session_id','sessions.id')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['employee_id']
    },
    page: req.query.$page,
    transacting: req.analytics
  })

  res.status(200).respond(sessions, SessionSerializer)

}

export default listRoute
