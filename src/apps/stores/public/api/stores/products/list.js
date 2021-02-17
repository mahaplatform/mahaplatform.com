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

  const products = await Product.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('distinct on (stores_products.id,stores_products.title) stores_products.*'))
      qb.leftJoin('stores_products_categories', 'stores_products_categories.product_id', 'stores_products.id')
      qb.where('stores_products.store_id', store.get('id'))
      qb.where('stores_products.is_active', true)
      qb.whereNull('stores_products.deleted_at')
      qb.orderBy('stores_products.title', 'asc')
    },
    aliases: {
      category_id: 'stores_products_categories.category_id'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    page: req.query.$page,
    withRelated: ['categories','variants.photos.asset','variants.project','variants.revenue_type','variants.donation_revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
