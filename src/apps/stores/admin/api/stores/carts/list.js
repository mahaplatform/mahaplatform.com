import CartSerializer from '@apps/stores/serializers/cart_serializer'
import Cart from '@apps/stores/models/cart'

const listRoute = async (req, res) => {

  const carts = await Cart.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('store_id', req.params.store_id)
      qb.where('status', 'active')
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    withRelated: ['items.variant.product'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(carts, CartSerializer)

}

export default listRoute
