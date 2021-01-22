import OrderSerializer from '@apps/stores/serializers/order_serializer'
import Order from '@apps/stores/models/order'
import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    withRelated: ['products.variants'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const orders = await Order.filterFetch({
    scope: qb => {
      qb.select('stores_orders.*','stores_order_totals.*','stores_order_variant_totals.variant_totals','stores_order_tokens.tokens')
      qb.innerJoin('stores_order_totals','stores_order_totals.order_id','stores_orders.id')
      qb.innerJoin('stores_order_variant_totals','stores_order_variant_totals.order_id','stores_orders.id')
      qb.innerJoin('stores_order_tokens','stores_order_tokens.order_id','stores_orders.id')
      qb.where('stores_orders.team_id', req.team.get('id'))
      qb.where('stores_orders.store_id', store.get('id'))
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at'
    },
    withRelated: ['contact.photo','payment'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(orders, OrderSerializer)

}

export default listRoute
