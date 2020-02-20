import RateSerializer from '../../../serializers/rate_serializer'
import Rate from '../../../models/rate'

const listRoute = async (req, res) => {

  const rates = await Rate.filterFetch({
    sort: {
      params: req.query.$sort,
      defaults: ['year'],
      allowed: ['year','value']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(rates, RateSerializer)

}

export default listRoute
