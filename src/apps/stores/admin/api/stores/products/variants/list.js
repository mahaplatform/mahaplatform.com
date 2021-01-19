import VariantSerializer from '@apps/stores/serializers/variant_serializer'
import Variant from '@apps/stores/models/variant'
import Product from '@apps/stores/models/product'
import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

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

  const variants = await Variant.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('product_id', product.get('id'))
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    withRelated: ['project','revenue_type','photos.asset'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(variants, VariantSerializer)

}

export default listRoute
