import MerchantSerializer from '../../../../../finance/serializers/merchant_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'
import Merchant from '../../../../../finance/models/merchant'

const createRoute = async (req, res) => {

  const merchant = await Merchant.forge({
    team_id: req.params.team_id,
    ...whitelist(req.body, ['title','braintree_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: merchant
  })

  await socket.refresh(req, [
    `/admin/platform/teams/${req.params.team_id}`
  ])

  res.status(200).respond(merchant, MerchantSerializer)

}

export default createRoute
