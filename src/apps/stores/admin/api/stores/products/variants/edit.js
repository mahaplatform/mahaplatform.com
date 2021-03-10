import Variant from '@apps/stores/models/variant'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const editRoute = async (req, res) => {

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
    withRelated: ['photos'],
    transacting: req.trx
  })

  if(!variant) return res.status(404).respond({
    code: 404,
    message: 'Unable to load variant'
  })

  await res.status(200).respond(variant, (req, variant) => ({
    id: variant.get('id'),
    store_id: store.get('id'),
    product_id: product.get('id'),
    photo_ids: variant.related('photos').map(photo => photo.get('id')),
    price_type: variant.get('price_type'),
    project_id: variant.get('project_id'),
    revenue_type_id: variant.get('revenue_type_id'),
    fixed_price: variant.get('fixed_price'),
    low_price: variant.get('low_price'),
    high_price: variant.get('high_price'),
    tax_rate: variant.get('tax_rate'),
    overage_strategy: variant.get('overage_strategy'),
    donation_revenue_type_id: variant.get('donation_revenue_type_id'),
    is_tax_deductable: variant.get('is_tax_deductable'),
    inventory_policy: variant.get('inventory_policy'),
    max_per_order: variant.get('max_per_order')
  }))

}

export default editRoute
