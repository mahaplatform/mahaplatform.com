import CallSerializer from '../../../serializers/call_serializer'
import Call from '@apps/maha/models/call'

const listRoute = async (req, res) => {

  const calls = await Call.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to','from'],
    transacting: req.trx
  })

  res.status(200).respond(calls, CallSerializer)

}

export default listRoute
