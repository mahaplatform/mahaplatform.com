import { activity } from '../../../../../core/services/routes/activities'
import MerchantSerializer from '../../../serializers/merchant_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Merchant from '../../../models/merchant'

const updateRoute = async (req, res) => {

  const merchant = await Merchant.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!merchant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load merchant'
  })

  await merchant.save(whitelist(req.body, ['title','integration']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: merchant
  })

  await audit(req, {
    story: 'updated',
    auditable: merchant
  })

  await socket.refresh(req, [
    '/admin/finance/merchants',
    `/admin/finance/merchants/${req.params.id}`
  ])

  res.status(200).respond(merchant, MerchantSerializer)

}

export default updateRoute
