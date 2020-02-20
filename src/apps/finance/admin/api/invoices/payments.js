import PaymentSerializer from '../../../serializers/payment_serializer'
import Invoice from '../../../models/invoice'
import Payment from '../../../models/payment'

const paymentsRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.invoice_id)
  }).fetch({
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const payments = await Payment.filterFetch({
    scope: (qb) => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('invoice_id', invoice.get('id'))
      qb.orderByRaw('date desc, created_at desc')
    },
    page: req.query.$page,
    withRelated: ['payment_method'],
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default paymentsRoute
