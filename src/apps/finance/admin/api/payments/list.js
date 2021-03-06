import PaymentSerializer from '@apps/finance/serializers/payment_serializer'
import Payment from '@apps/finance/models/payment'

const listRoute = async (req, res) => {

  const payments = await Payment.filterFetch({
    scope: qb => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.innerJoin('finance_invoices','finance_invoices.id','finance_payments.invoice_id')
      qb.innerJoin('finance_customers','finance_customers.id','finance_invoices.customer_id')
      qb.innerJoin('finance_payment_methods','finance_payment_methods.id','finance_payments.payment_method_id')
      qb.where('finance_payments.team_id', req.team.get('id'))
    },
    aliases: {
      card_type: 'finance_payment_methods.card_type',
      customer: 'finance_customers.last_name',
      first_name: 'finance_customers.first_name',
      last_name: 'finance_customers.last_name',
      customer_id: 'finance_invoices.customer_id',
      paypal_id: 'finance_payments.paypal_id',
      braintree_id: 'finance_payments.braintree_id'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['date','method','card_type','bank_id','customer_id','status'],
      search: ['first_name','last_name','paypal_id','braintree_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','amount','customer','date','method','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['payment_method','invoice.customer'],
    transacting: req.trx
  })

  await res.status(200).respond(payments, PaymentSerializer)

}

export default listRoute
