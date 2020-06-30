import PaymentSerializer from '../../../serializers/payment_serializer'
import Payment from '../../../models/payment'

const showRoute = async (req, res) => {

  const payment = await Payment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select('finance_payments.*','finance_payment_details.*')
    qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['credit','deposit.merchant','invoice.customer','merchant','payment_method','photo','refunds','scholarship'],
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  res.status(200).respond(payment, PaymentSerializer)

}

export default showRoute
