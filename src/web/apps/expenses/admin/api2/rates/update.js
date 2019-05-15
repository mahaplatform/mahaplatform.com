import RateSerializer from '../../../serializers/rate_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Rate from '../../../models/rate'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const rate = await Rate.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!rate) return req.status(404).respond({
    code: 404,
    message: 'Unable to load rate'
  })

  const allowed = _.pick(req.body, ['year','value'])

  const data = _.omitBy(allowed, _.isNil)

  await rate.save(data, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: rate
  })

  await socket.refresh(req, [
    '/admin/expenses/rates'
  ])

  res.status(200).respond(rate, (rate) => {
    return RateSerializer(req, req.trx, rate)
  })

}

export default updateRoute
