import { activity } from '../../../../../core/services/routes/activities'
import ProductSerializer from '../../../serializers/product_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Product from '../../../models/product'

const createRoute = async (req, res) => {

  const product = await Product.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','project_id','revenue_type_id','price','tax_rate','is_tax_deductible'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: product
  })

  await socket.refresh(req, [
    '/admin/finance/products'
  ])

  res.status(200).respond(product, ProductSerializer)

}

export default createRoute
