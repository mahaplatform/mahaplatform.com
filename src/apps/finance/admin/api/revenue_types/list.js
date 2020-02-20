import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import RevenueType from '../../../models/revenue_type'

const listRoute = async (req, res) => {

  const revenue_types = await RevenueType.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    aliases: {
      revenue_code: 'integration->>\'revenue_code\''
    },
    filter: req.query.$filter,
    searchParams: ['title','description','integration->>\'revenue_code\''],
    sort: req.query.$sort,
    defaultSort: ['revenue_code'],
    sortParams: ['id','title','revenue_code','is_active','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(revenue_types, RevenueTypeSerializer)

}

export default listRoute
