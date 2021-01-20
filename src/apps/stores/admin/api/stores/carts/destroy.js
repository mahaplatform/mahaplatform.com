import socket from '@core/services/routes/emitter'
import Store from '@apps/stores/models/store'
import Cart from '@apps/stores/models/cart'

const destroyRoute = async (req, res) => {

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

  const cart = await Cart.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('store_id', store.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['items.variant.product'],
    transacting: req.trx
  })

  if(!cart) return res.status(404).respond({
    code: 404,
    message: 'Unable to load cart'
  })

  await cart.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}/carts`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
