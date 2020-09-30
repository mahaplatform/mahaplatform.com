import ProductSerializer from '../../../../serializers/product_serializer'
import Product from '../../../../models/product'
import Store from '../../../../models/store'

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

  const products = await Product.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('is_active', true)
    qb.whereNull('deleted_at')
  }).fetchAll({
    withRelated: ['variants.photos.asset','variants.project','variants.revenue_type','variants.donation_revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
