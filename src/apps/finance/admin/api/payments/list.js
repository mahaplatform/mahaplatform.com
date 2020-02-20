import PaymentSerializer from '../../../serializers/payment_serializer'
import Payment from '../../../models/payment'

const listRoute = async (req, res) => {

  const payments = await Payment.filter({
    scope: qb => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.innerJoin('finance_invoices','finance_invoices.id','finance_payments.invoice_id')
      qb.innerJoin('finance_customers','finance_customers.id','finance_invoices.customer_id')
      qb.where('finance_payments.team_id', req.team.get('id'))
    },
    aliases: {
      customer_id: 'finance_invoices.customer_id'
    },
    filter: req.query.$filter,
    filterParams: ['date','method','card_type','merchant_id','customer_id','status'],
    searchParams: ['code'],
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','amount','customer','date','method','status','created_at']
  }).fetchPage({
    withRelated: ['payment_method','invoice.customer'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default listRoute
