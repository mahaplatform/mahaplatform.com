import ProductSerializer from '@apps/stores/serializers/product_serializer'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.store_code)
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const product = await Product.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('is_active', true)
    qb.whereNull('deleted_at')
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['variants.photos.asset','variants.project','variants.revenue_type','variants.donation_revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(product, ProductSerializer)

}

export default listRoute
