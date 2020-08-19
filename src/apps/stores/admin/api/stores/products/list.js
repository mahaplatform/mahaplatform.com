import ProductSerializer from '../../../../serializers/product_serializer'
import Product from '../../../../models/product'

const listRoute = async (req, res) => {

  const products = await Product.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('store_id', req.params.store_id)
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
    withRelated: ['variants.project','variants.revenue_type'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(products, ProductSerializer)

}

export default listRoute
