import PaymentSerializer from '../../../serializers/payment_serializer'
import Customer from '../../../models/customer'
import Payment from '../../../models/payment'

const paymentsRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const payments = await Payment.query(qb => {
    qb.select('finance_payments.*','finance_payment_details.*')
    qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
    qb.innerJoin('finance_invoices','finance_invoices.id', 'finance_payments.invoice_id')
    qb.where('finance_payments.team_id', req.team.get('id'))
    qb.where('finance_invoices.customer_id', customer.get('id'))
    qb.orderByRaw('finance_payments.date desc, finance_payments.created_at desc')
  }).fetchPage({
    withRelated: ['payment_method'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default paymentsRoute
