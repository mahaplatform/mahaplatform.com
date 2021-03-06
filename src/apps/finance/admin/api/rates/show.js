import RateSerializer from '@apps/finance/serializers/rate_serializer'
import Rate from '@apps/finance/models/rate'

const showRoute = async (req, res) => {

  const rate = await Rate.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!rate) return res.status(404).respond({
    code: 404,
    message: 'Unable to load rate'
  })

  await res.status(200).respond(rate, RateSerializer)

}

export default showRoute
