import socket from '@core/services/routes/emitter'
import CartSerializer from '../../../../serializers/cart_serializer'
import Store from '../../../../models/store'
import Cart from '../../../../models/cart'

const getCart = async (req, { store, code }) => {

  const cart = await Cart.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('status', 'active')
    qb.where('code', code)
  }).fetch({
    transacting: req.trx
  })

  if(cart) return cart

  return await Cart.forge({
    team_id: store.get('team_id'),
    store_id: store.get('id'),
    code,
    data: {
      items: []
    },
    status: 'active'
  }).save(null, {
    transacting: req.trx
  })
}

const updateRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.store_code)
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const cart = await getCart(req, {
    store,
    code: req.params.code
  })

  const { discount_id, items } = req.body.data

  await cart.save({
    ...items ? { data: { items } } : {},
    ...discount_id ? { discount_id } : {}
  }, {
    transacting: req.trx,
    patch: true
  })

  await cart.load(['discount','items.variant.product'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/stores/stores/${store.get('id')}`
  ])

  res.status(200).respond(cart, CartSerializer)

}

export default updateRoute
