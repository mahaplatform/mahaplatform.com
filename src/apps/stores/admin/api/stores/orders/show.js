import OrderSerializer from '@apps/stores/serializers/order_serializer'
import Store from '@apps/stores/models/store'
import Order from '@apps/stores/models/order'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.store_id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const order = await Order.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment','store','items.variant.product','items.variant.photos.asset','payment.allocations.line_item'],
    transacting: req.trx
  })

  if(!order) return res.status(404).respond({
    code: 404,
    message: 'Unable to load order'
  })

  res.status(200).respond(order, OrderSerializer)

}

export default showRoute
