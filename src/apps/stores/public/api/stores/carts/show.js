import Store from '../../../../models/store'
import Cart from '../../../../models/cart'

const getCart = async (req, { store, code }) => {

  const cart = await Cart.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('code', code)
  }).fetch({
    transacting: req.trx
  })

  if(cart) return cart.get('data')

  return {
    items: []
  }
}

const showRoute = async (req, res) => {

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

  const data = await getCart(req, {
    store,
    code: req.params.code
  })

  res.status(200).respond(data)

}

export default showRoute
