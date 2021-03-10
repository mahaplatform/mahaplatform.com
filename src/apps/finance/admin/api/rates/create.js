import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import RateSerializer from '@apps/finance/serializers/rate_serializer'
import socket from '@core/services/routes/emitter'
import Rate from '@apps/finance/models/rate'

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

  await res.status(200).respond(rate, RateSerializer)

}

export default createRoute
