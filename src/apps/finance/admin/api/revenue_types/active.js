import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import RevenueType from '../../../models/revenue_type'

const listRoute = async (req, res) => {

  const revenue_types = await RevenueType.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('is_active', true)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title','description','integration->\'revenue_code\'']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['title'],
      allowed: ['id','title','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(revenue_types, RevenueTypeSerializer)

}

export default listRoute
