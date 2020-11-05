import RefundSerializer from '@apps/finance/serializers/refund_serializer'
import Refund from '@apps/finance/models/refund'

const listRoute = async (req, res) => {

  const refunds = await Refund.filterFetch({
    scope: qb => {
      qb.innerJoin('finance_payments', 'finance_payments.id', 'finance_refunds.payment_id')
      qb.innerJoin('finance_invoices','finance_invoices.id','finance_payments.invoice_id')
      qb.innerJoin('finance_customers','finance_customers.id','finance_invoices.customer_id')
      qb.where('finance_refunds.team_id', req.team.get('id'))
    },
    aliases: {
      customer: 'finance_customers.last_name',
      first_name: 'finance_customers.first_name',
      last_name: 'finance_customers.last_name',
      customer_id: 'finance_invoices.customer_id'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['date','method','card_type','bank_id','customer_id','status'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','amount','customer','date','method','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['payment.invoice.customer','payment.payment_method'],
    transacting: req.trx
  })

  res.status(200).respond(refunds, RefundSerializer)

}

export default listRoute
