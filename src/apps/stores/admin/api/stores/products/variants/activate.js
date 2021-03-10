import socket from '@core/services/routes/emitter'
import Variant from '@apps/stores/models/variant'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const activateRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const product = await Product.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.product_id)
  }).fetch({
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  const variant = await Variant.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('product_id', product.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!variant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load variant'
  })


  await variant.save({
    is_active: req.body.is_active
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/products/${product.get('id')}`
  ])

  await res.status(200).respond(true)
}

export default activateRoute
