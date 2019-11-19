import RevenueTypeSerializer from '../../../serializers/revenue_type_serializer'
import RevenueType from '../../../models/revenue_type'

const listRoute = async (req, res) => {

  const revenue_types = await RevenueType.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title','description','integration->>\'revenue_code\'']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['title'],
    sortParams: ['id','title','is_active','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(revenue_types, RevenueTypeSerializer)

}

export default listRoute
