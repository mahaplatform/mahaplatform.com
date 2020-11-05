import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { deleteProduct } from '@apps/stores/services/products'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const destroyRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const product = await Product.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['variants'],
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  await deleteProduct(req, {
    product
  })

  await activity(req, {
    story: 'deleted {object}',
    object: product
  })

  await socket.refresh(req, [
    '/admin/stores/stores',
    `/admin/stores/stores/${store.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
