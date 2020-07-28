import PaymentSerializer from '../../../../serializers/payment_serializer'
import Payment from '../../../../models/payment'
import Credit from '../../../../models/credit'

const paymentsRoute = async (req, res) => {

  const credit = await Credit.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', req.params.customer_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!credit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load credit'
  })

  const payments = await Payment.filterFetch({
    scope: (qb) => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('credit_id', credit.get('id'))
      qb.orderByRaw('date desc, created_at desc')
    },
    page: req.query.$page,
    withRelated: ['payment_method'],
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default paymentsRoute
