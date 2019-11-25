import { activity } from '../../../../../core/services/routes/activities'
import ProductSerializer from '../../../serializers/product_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Product from '../../../models/product'

const updateRoute = async (req, res) => {

  const product = await Product.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  await product.save(whitelist(req.body, ['title','project_id','revenue_type_id','price_type','fixed_price','low_price','high_price','tax_rate']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: product
  })

  await socket.refresh(req, [
    '/admin/finance/products'
  ])

  res.status(200).respond(product, ProductSerializer)

}

export default updateRoute
