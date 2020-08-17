import Store from '../../../../models/store'
import Cart from '../../../../models/cart'

const createRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.code)
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const cart = await Cart.forge({
    store_id: store.get('id')
  }).save(null, {
    transacting: req.trx
  })

  res.status(200).respond(cart)

}

export default createRoute
