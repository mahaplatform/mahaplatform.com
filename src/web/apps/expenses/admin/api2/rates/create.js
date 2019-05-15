import RateSerializer from '../../../serializers/rate_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Rate from '../../../models/rate'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['year','value'])

  const data = _.omitBy(allowed, _.isNil)

  const rate = await Rate.forge(data).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: rate
  })

  await socket.refresh(req, [
    '/admin/expenses/rates'
  ])

  res.status(200).respond(rate, (rate) => {
    return RateSerializer(req, req.trx, rate)
  })

}

export default createRoute
