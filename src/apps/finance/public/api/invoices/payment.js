import { makePayment } from '../../../services/payments'
import Invoice from '../../../models/invoice'

const paymentRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const payment = await makePayment(req, {
    invoice,
    params: req.body
  })
  
  res.status(200).respond(true)

}

export default paymentRoute
