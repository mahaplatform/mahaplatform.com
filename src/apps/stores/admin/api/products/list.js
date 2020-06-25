import ProductSerializer from '../../../serializers/product_serializer'
import Product from '../../../models/product'

const listRoute = async (req, res) => {

  const product = await Product.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(product, ProductSerializer)

}

export default listRoute
