import CallSerializer from '../../../serializers/call_serializer'
import Call from '../../../../maha/models/call'

const listRoute = async (req, res) => {

  const calls = await Call.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['to','from'],
    transacting: req.trx
  })

  res.status(200).respond(calls, CallSerializer)

}

export default listRoute
