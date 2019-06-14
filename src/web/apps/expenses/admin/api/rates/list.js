import RateSerializer from '../../../serializers/rate_serializer'
import Rate from '../../../models/rate'

const listRoute = async (req, res) => {

  const rates = await Rate.sort({
    sort: req.query.$sort,
    defaultSort: ['year'],
    sortParams: ['year','value']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(rates, (rate) => {
    return RateSerializer(req, rate)
  })

}

export default listRoute
