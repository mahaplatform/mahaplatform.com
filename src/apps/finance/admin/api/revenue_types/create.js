import { activity } from '../../../../../core/services/routes/activities'
import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import RevenueType from '../../../models/revenue_type'

const createRoute = async (req, res) => {

  const revenue_type = await RevenueType.forge({
    is_active: true,
    ...whitelist(req.body, ['title','description','integration','is_active'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: revenue_type
  })

  await socket.refresh(req, [
    '/admin/finance/revenue_types'
  ])

  res.status(200).respond(revenue_type, RevenueTypeSerializer)

}

export default createRoute
