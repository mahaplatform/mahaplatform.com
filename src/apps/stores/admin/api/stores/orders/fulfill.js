import socket from '@core/services/routes/emitter'
import Store from '@apps/stores/models/store'
import Order from '@apps/stores/models/order'
import _ from 'lodash'

const fulfillRoute = async (req, res) => {

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
    withRelated: ['items'],
    transacting: req.trx
  })

  if(!order) return res.status(404).respond({
    code: 404,
    message: 'Unable to load order'
  })

  await Promise.map(order.related('items'), async (item) => {
    if(!_.includes(req.body.item_ids, item.id)) return
    await item.save({
      status: 'fulfilled'
    },{
      transacting: req.trx,
      patch: true
    })
  })

  await socket.refresh(req, [
    '/admin/stores/stores',
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/orders`,
    `/admin/stores/stores/${store.get('id')}/orders/${order.get('id')}`
  ])

  res.status(200).respond(true)

}

export default fulfillRoute
