import RateSerializer from '@apps/finance/serializers/rate_serializer'
import Rate from '@apps/finance/models/rate'

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

  await res.status(200).respond(rates, RateSerializer)

}

export default listRoute
