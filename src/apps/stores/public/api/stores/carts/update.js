import Store from '../../../../models/store'
import Cart from '../../../../models/cart'

const getCart = async (req, { store, code }) => {

  const cart = await Cart.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('code', code)
  }).fetch({
    transacting: req.trx
  })

  if(cart) return cart

  return await await Cart.forge({
    team_id: store.get('team_id'),
    store_id: store.get('id'),
    code,
    data: {
      items: []
    }
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
  
  await cart.save({
    data: req.body.data
  }, {
    transacting: req.trx
  })

  res.status(200).respond(cart, (req, cart) => cart.get('data'))

}

export default updateRoute
