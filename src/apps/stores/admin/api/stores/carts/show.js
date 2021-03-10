import CartSerializer from '@apps/stores/serializers/cart_serializer'
import Store from '@apps/stores/models/store'
import Cart from '@apps/stores/models/cart'

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

  await res.status(200).respond(cart, CartSerializer)

}

export default showRoute
