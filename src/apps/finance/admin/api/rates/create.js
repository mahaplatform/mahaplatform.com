import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import RateSerializer from '../../../serializers/rate_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Rate from '../../../models/rate'

const createRoute = async (req, res) => {

  const rate = await Rate.forge(whitelist(req.body, ['year','value'])).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: rate
  })

  await socket.refresh(req, [
    '/admin/finance/rates'
  ])

  res.status(200).respond(rate, RateSerializer)

}

export default createRoute
