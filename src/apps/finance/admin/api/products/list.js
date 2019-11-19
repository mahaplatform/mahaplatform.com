import ProductSerializer from '../../../serializers/product_serializer'
import Product from '../../../models/product'

const listRoute = async (req, res) => {

  const products = await Product.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['title'],
    sortParams: ['id','title','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['project','revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
