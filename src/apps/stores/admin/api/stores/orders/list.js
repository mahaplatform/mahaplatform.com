import OrderSerializer from '@apps/stores/serializers/order_serializer'
import Order from '@apps/stores/models/order'

const listRoute = async (req, res) => {

  const orders = await Order.filterFetch({
    scope: qb => {
      qb.select('stores_orders.*','stores_order_totals.*','stores_order_tokens.tokens')
      qb.innerJoin('stores_order_totals','stores_order_totals.order_id','stores_orders.id')
      qb.innerJoin('stores_order_tokens','stores_order_tokens.order_id','stores_orders.id')
      qb.where('stores_orders.team_id', req.team.get('id'))
      qb.where('stores_orders.store_id', req.params.store_id)
    },
    sort: {
      params: req.query.$sort,
      defaults: 'code'
    },
    withRelated: ['contact.photo','payment'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(orders, OrderSerializer)

}

export default listRoute
