import CallSerializer from '@apps/maha/serializers/call_serializer'
import Call from '@apps/maha/models/call'

const listRoute = async (req, res) => {

  const calls = await Call.filterFetch({
    scope: (qb) => {
      qb.select('maha_calls.*','maha_call_totals.*')
      qb.innerJoin('maha_call_totals','maha_call_totals.call_id','maha_calls.id')
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['to_number','from_number'],
    transacting: req.trx
  })

  await res.status(200).respond(calls, CallSerializer)

}

export default listRoute
