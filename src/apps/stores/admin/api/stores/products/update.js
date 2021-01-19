import ProductSerializer from '@apps/stores/serializers/product_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const updateRoute = async (req, res) => {

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
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['variants','categories'],
    transacting: req.trx
  })

  if(!product) return res.status(404).respond({
    code: 404,
    message: 'Unable to load product'
  })

  await product.save({
    ...whitelist(req.body, ['title','description'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.mapSeries(req.body.category_ids, async(category_id) => {
    await req.trx('stores_products_categories').insert({
      product_id: product.get('id'),
      category_id
    })
  })

  await audit(req, {
    story: 'updated',
    auditable: product
  })

  await activity(req, {
    story: 'updated {object}',
    object: product
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/products/${product.get('id')}`
  ])

  res.status(200).respond(product, ProductSerializer)

}

export default updateRoute
