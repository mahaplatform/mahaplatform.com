import { whitelist } from '../../../../../core/services/routes/params'
import FilterSerializer from '../../../serializers/filter_serializer'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Filter from '../../../models/filter'

const createRoute = async (req, res) => {

  const filter = await Filter.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    code: req.params.code,
    ...whitelist(req.body, ['title','description','criteria'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.map(req.body.accesses, async access => {

    await knex('maha_filter_accesses').transacting(req.trx).insert({
      team_id: req.team.get('id'),
      filter_id: filter.get('id'),
      grouping: access.grouping,
      group_id: access.group_id,
      user_id: access.user_id
    })

  })

  await socket.refresh(req, [
    `/admin/${req.params.code}/filters`
  ])

  res.status(200).respond(filter, FilterSerializer)

}

export default createRoute
