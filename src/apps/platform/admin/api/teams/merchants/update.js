import MerchantSerializer from '../../../../../finance/serializers/merchant_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'
import Merchant from '../../../../../finance/models/merchant'

const createRoute = async (req, res) => {

  const merchant = await Merchant.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!merchant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load merchant'
  })

  await merchant.save({
    ...whitelist(req.body, ['braintree_id'])
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: merchant
  })

  await socket.refresh(req, [
    `/admin/platform/teams/${req.params.team_id}`,
    `/admin/platform/finance/merchants/${merchant.get('id')}`
  ])

  res.status(200).respond(merchant, MerchantSerializer)

}

export default createRoute
