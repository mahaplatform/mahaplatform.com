import { activity } from '../../../../../core/services/routes/activities'
import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import RevenueType from '../../../models/revenue_type'

const updateRoute = async (req, res) => {

  const revenue_type = await RevenueType.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!revenue_type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load revenue type'
  })

  await revenue_type.save(whitelist(req.body, ['title','description','integration','is_active']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: revenue_type
  })

  await socket.refresh(req, [
    '/admin/finance/revenue_types'
  ])

  res.status(200).respond(revenue_type, RevenueTypeSerializer)

}

export default updateRoute
