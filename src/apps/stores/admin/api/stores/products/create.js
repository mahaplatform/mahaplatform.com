import { activity } from '@core/services/routes/activities'
import ProductSerializer from '@apps/stores/serializers/product_serializer'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Adjustment from '@apps/stores/models/adjustment'
import Variant from '@apps/stores/models/variant'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'
import Photo from '@apps/stores/models/photo'

const createRoute = async (req, res) => {

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

  const product_code = await generateCode(req, {
    table: 'stores_products'
  })

  const product = await Product.forge({
    team_id: req.team.get('id'),
    store_id: store.get('id'),
    code: product_code,
    title: req.body.title,
    slug: req.body.title.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '-').toLowerCase(),
    ...whitelist(req.body, ['title','description','options','type']),
    is_active: true
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.category_ids, async(category_id) => {
    await req.trx('stores_products_categories').insert({
      product_id: product.get('id'),
      category_id
    })
  })

  await Promise.mapSeries(req.body.variants, async(data) => {

    const variant_code = await generateCode(req, {
      table: 'stores_variants'
    })

    const variant = await Variant.forge({
      team_id: req.team.get('id'),
      product_id: product.get('id'),
      code: variant_code,
      is_active: data.is_active,
      options: data.options,
      price_type: data.price_type,
      project_id: data.project_id,
      revenue_type_id: data.revenue_type_id,
      fixed_price: data.fixed_price,
      low_price: data.low_price,
      high_price: data.high_price,
      overage_strategy: data.overage_strategy,
      donation_revenue_type_id: data.donation_revenue_type_id,
      tax_rate: data.tax_rate,
      inventory_policy: data.inventory_policy,
      shipping_strategy: data.shipping_strategy,
      shipping_fee: data.shipping_fee,
      file_id: data.file_id,
      url: data.url
    }).save(null, {
      transacting: req.trx
    })

    await Adjustment.forge({
      team_id: req.team.get('id'),
      variant_id: variant.get('id'),
      quantity: data.inventory_quantity
    }).save(null, {
      transacting: req.trx
    })

    await Promise.mapSeries(data.photo_ids, async(asset_id, delta) => {
      await Photo.forge({
        team_id: req.team.get('id'),
        variant_id: variant.get('id'),
        delta,
        asset_id
      }).save(null, {
        transacting: req.trx
      })
    })

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
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/products/${product.get('id')}`
  ])

  await product.load(['variants.photos'], {
    transacting: req.trx
  })

  res.status(200).respond(product, ProductSerializer)

}

export default createRoute
