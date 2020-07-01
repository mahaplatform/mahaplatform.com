import PaymentSerializer from '../../../serializers/payment_serializer'
import Deposit from '../../../models/deposit'
import Payment from '../../../models/payment'

const paymentsRoute = async (req, res) => {

  const deposit = await Deposit.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.deposit_id)
  }).fetch({
    withRelated: ['bank','payments'],
    transacting: req.trx
  })

  if(!deposit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load deposit'
  })

  const payments = await Payment.filterFetch({
    scope: (qb) => {
      qb.select('finance_payments.*','finance_payment_details.*')
      qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
      qb.where('finance_payments.team_id', req.team.get('id'))
      qb.where('finance_payments.deposit_id', deposit.get('id'))
      qb.orderByRaw('date desc, created_at desc')
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default paymentsRoute
