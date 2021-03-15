import { getPaymentTokens } from '@apps/finance/services/payments'
import Order from '@apps/stores/models/order'

const getOrderTokens = async (req, { order_id }) => {

  const order = await Order.query(qb => {
    qb.select('stores_orders.*','stores_order_tokens.tokens')
    qb.innerJoin('stores_order_tokens','stores_order_tokens.order_id','stores_orders.id')
    qb.where('id', order_id)
  }).fetch({
    transacting: req.trx
  })

  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: order.get('invoice_id')
  })

  const tokens = order.get('tokens')

  return {
    ...tokens,
    ...payment_tokens,
    maha_url: `${process.env.ADMIN_HOST}${tokens.path}`
  }

}

export default getOrderTokens
