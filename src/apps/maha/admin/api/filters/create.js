import { whitelist } from '../../../../../core/services/routes/params'
import FilterSerializer from '../../../serializers/filter_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Filter from '../../../models/filter'
import moment from 'moment'

const createRoute = async (req, res) => {

  const filter = await Filter.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    code: req.params.code,
    ...whitelist(req.body, ['title','description','config'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.accesses) {
    await Promise.map(req.body.accesses, async access => {
      await req.trx('maha_filter_accesses').insert({
        team_id: req.team.get('id'),
        filter_id: filter.get('id'),
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        created_at: moment(),
        updated_at: moment()
      })
    })
  }

  await filter.load(['owner'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/${req.params.code}/filters`
  ])

  res.status(200).respond(filter, FilterSerializer)

}

export default createRoute
