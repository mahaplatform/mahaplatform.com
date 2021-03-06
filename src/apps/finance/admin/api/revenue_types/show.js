import RevenueTypeSerializer from '@apps/finance/serializers/revenue_type_serializer'
import RevenueType from '@apps/finance/models/revenue_type'

const showRoute = async (req, res) => {

  const revenue_type = await RevenueType.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!revenue_type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load revenue type'
  })

  await res.status(200).respond(revenue_type, RevenueTypeSerializer)

}

export default showRoute
