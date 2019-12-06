import RefundSerializer from '../../../serializers/refund_serializer'
import Customer from '../../../models/customer'
import Refund from '../../../models/refund'

const refundsRoute = async (req, res) => {

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

  const refunds = await Refund.query(qb => {
    qb.innerJoin('finance_payments','finance_payments.id', 'finance_refunds.payment_id')
    qb.innerJoin('finance_invoices','finance_invoices.id', 'finance_payments.invoice_id')
    qb.where('finance_refunds.team_id', req.team.get('id'))
    qb.where('finance_invoices.customer_id', customer.get('id'))
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(refunds, RefundSerializer)

}

export default refundsRoute
