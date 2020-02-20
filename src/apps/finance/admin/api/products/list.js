import ProductSerializer from '../../../serializers/product_serializer'
import Product from '../../../models/product'

const listRoute = async (req, res) => {

  const products = await Product.filter({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filterParams: ['project_id','revenue_type_id','is_tax_deductible'],
    filter: req.query.$filter,
    searchParams: ['title'],
    sort: req.query.$sort,
    defaultSort: ['title'],
    sortParams: ['id','title','tax_rate','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['project','revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
