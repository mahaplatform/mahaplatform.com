import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import RateSerializer from '../../../serializers/rate_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Rate from '../../../models/rate'

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

  await rate.save(whitelist(req.body, ['year','value']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: rate
  })

  await socket.refresh(req, [
    '/admin/expenses/rates'
  ])

  res.status(200).respond(rate,RateSerializer)

}

export default updateRoute
