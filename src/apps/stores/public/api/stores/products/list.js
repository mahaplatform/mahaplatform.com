import ProductSerializer from '../../../../serializers/product_serializer'
import Store from '../../../../models/store'

const listRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.store_code)
    qb.whereNull('deleted_at')
  }).fetch({
    withRelated: ['products.variants.media.asset','products.variants.project','products.variants.revenue_type','products.variants.donation_revenue_type'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  res.status(200).respond(store.related('products'), ProductSerializer)

}

export default listRoute
