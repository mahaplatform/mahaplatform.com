import ProductSerializer from '../../../serializers/product_serializer'
import Product from '../../../models/product'

const listRoute = async (req, res) => {

  const products = await Product.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['project_id','revenue_type_id','is_tax_deductible'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['title'],
      allowed: ['id','title','tax_rate','created_at']
    },
    page: req.query.$page,
    withRelated: ['project','revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
