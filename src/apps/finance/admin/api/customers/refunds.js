import RefundSerializer from '@apps/finance/serializers/refund_serializer'
import Customer from '@apps/finance/models/customer'
import Refund from '@apps/finance/models/refund'

const refundsRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const refunds = await Refund.filterFetch({
    scope: (qb) => {
      qb.innerJoin('finance_payments','finance_payments.id', 'finance_refunds.payment_id')
      qb.innerJoin('finance_invoices','finance_invoices.id', 'finance_payments.invoice_id')
      qb.where('finance_refunds.team_id', req.team.get('id'))
      qb.where('finance_invoices.customer_id', customer.get('id'))
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(refunds, RefundSerializer)

}

export default refundsRoute
