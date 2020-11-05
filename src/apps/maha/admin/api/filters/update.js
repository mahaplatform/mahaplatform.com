import { whitelist } from '@core/services/routes/params'
import FilterSerializer from '@apps/maha/serializers/filter_serializer'
import socket from '@core/services/routes/emitter'
import Filter from '@apps/maha/models/filter'
import moment from 'moment'

const updateRoute = async (req, res) => {

  const filter = await Filter.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('code', req.params.code)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!filter) return res.status(404).respond({
    code: 404,
    message: 'Unable to load filter'
  })

  await filter.save({
    ...whitelist(req.body, ['title','config'])
  }, {
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

  await socket.refresh(req, [
    `/admin/${req.params.code}/filters`
  ])

  res.status(200).respond(filter, FilterSerializer)

}

export default updateRoute
