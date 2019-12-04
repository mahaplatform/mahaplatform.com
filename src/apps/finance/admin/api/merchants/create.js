import MerchantSerializer from '../../../serializers/merchant_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Merchant from '../../../models/merchant'

const createRoute = async (req, res) => {

  const merchant = await Merchant.forge({
    team_id: req.team.get('id'),
    status: 'pending',
    title: req.body.title,
    bank_name: req.body.routing.bank_name,
    routing_number: req.body.routing.number,
    account_number: req.body.account_number
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: merchant
  })

  await socket.refresh(req, [
    '/admin/finance/merchants'
  ])

  res.status(200).respond(merchant, MerchantSerializer)

}

export default createRoute
