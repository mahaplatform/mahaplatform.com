import RateSerializer from '../../../serializers/rate_serializer'
import Rate from '../../../models/rate'

const showRoute = async (req, res) => {

  const rate = await Rate.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!rate) return req.status(404).respond({
    code: 404,
    message: 'Unable to load rate'
  })

  res.status(200).respond(rate, (rate) => {
    return RateSerializer(req, rate)
  })

}

export default showRoute
