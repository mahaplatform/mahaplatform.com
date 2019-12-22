import ProductSerializer from '../../../serializers/product_serializer'
import Product from '../../../models/product'

const showRoute = async (req, res) => {

  const product = await Product.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['project','revenue_type','donation_revenue_type'],
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  res.status(200).respond(product, ProductSerializer)

}

export default showRoute
