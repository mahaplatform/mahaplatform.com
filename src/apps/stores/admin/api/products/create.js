import { activity } from '../../../../../core/services/routes/activities'
// import { createConfirmationWorkflow } from '../../../services/workflows'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import ProductSerializer from '../../../serializers/product_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Product from '../../../models/product'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'stores_products'
  })

  const product = await Product.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['title','permalink']),
    ...req.body.pricing
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: product
  })

  await activity(req, {
    story: 'created {object}',
    object: product
  })

  await socket.refresh(req, [
    '/admin/products/products'
  ])

  await product.load(['project','revenue_type','donation_revenue_type'], {
    transacting: req.trx
  })

  res.status(200).respond(product, ProductSerializer)

}

export default createRoute
