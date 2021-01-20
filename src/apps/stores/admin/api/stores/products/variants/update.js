import VariantSerializer from '@apps/stores/serializers/variant_serializer'
import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Variant from '@apps/stores/models/variant'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'
import Photo from '@apps/stores/models/photo'

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
    inventory_policy: req.body.inventory_policy,
    price_type: req.body.price_type,
    project_id: req.body.project_id,
    revenue_type_id: req.body.revenue_type_id,
    fixed_price: req.body.fixed_price,
    low_price: req.body.low_price,
    high_price: req.body.high_price,
    tax_rate: req.body.tax_rate,
    overage_strategy: req.body.overage_strategy,
    donation_revenue_type_id: req.body.donation_revenue_type_id,
    is_tax_deductable: req.body.is_tax_deductable
  }, {
    transacting: req.trx,
    patch: true
  })

  await req.trx('stores_photos').where('variant_id', variant.get('id')).del()

  if(req.body.photo_ids) {
    await Promise.mapSeries(req.body.photo_ids, async(asset_id, delta) => {
      await Photo.forge({
        team_id: req.team.get('id'),
        variant_id: variant.get('id'),
        delta,
        asset_id
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  await audit(req, {
    story: 'update',
    auditable: variant
  })

  await activity(req, {
    story: 'updated {object}',
    object: variant
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/products/${product.get('id')}`
  ])

  res.status(200).respond(variant, VariantSerializer)

}

export default updateRoute
