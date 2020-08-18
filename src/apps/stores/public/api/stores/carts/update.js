import Store from '../../../../models/store'
import Cart from '../../../../models/cart'

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

  const cart = await Cart.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  await cart.save({
    data: req.body.data
  }, {
    transacting: req.trx
  })

  res.status(200).respond(cart, (req, cart) => cart.get('data'))

}

export default updateRoute
