import DiscountSerializer from '@apps/stores/serializers/discount_serializer'
import Discount from '@apps/stores/models/discount'
import Store from '@apps/stores/models/store'
import Cart from '@apps/stores/models/cart'

const discountRoute = async (req, res) => {

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

  if(!cart) return res.status(404).respond({
    code: 404,
    message: 'Unable to load cart'
  })

  const discount = await Discount.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.whereRaw('lower(code) = ?', req.body.code.toLowerCase())
  }).fetch({
    transacting: req.trx
  })

  if(!discount) return res.status(404).respond({
    code: 404,
    message: 'Unable to load discount'
  })

  res.status(200).respond(discount, DiscountSerializer)

}

export default discountRoute
