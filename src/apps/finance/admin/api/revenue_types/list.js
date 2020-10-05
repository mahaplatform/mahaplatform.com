import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import RevenueType from '../../../models/revenue_type'

const listRoute = async (req, res) => {

  const revenue_types = await RevenueType.filterFetch({
    scope: (qb) => {
      qb.where('is_active',true)
    },
    aliases: {
      revenue_code: 'integration->\'revenue_code\''
    },
    filter: {
      params: req.query.$filter,
      search: ['title','description','revenue_code']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['revenue_code'],
      allowed: ['id','title','revenue_code','is_active','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(revenue_types, RevenueTypeSerializer)

}

export default listRoute
