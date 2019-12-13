import PaymentSerializer from '../../../serializers/payment_serializer'
import Disbursement from '../../../models/disbursement'
import Payment from '../../../models/payment'

const paymentsRoute = async (req, res) => {

  const disbursement = await Disbursement.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.disbursement_id)
  }).fetch({
    withRelated: ['merchant','payments'],
    transacting: req.trx
  })

  if(!disbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load disbursement'
  })

  const payments = await Payment.query(qb => {
    qb.select('finance_payments.*','finance_payment_details.*')
    qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('disbursement_id', disbursement.get('id'))
    qb.orderByRaw('date desc, created_at desc')
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(payments, PaymentSerializer)

}

export default paymentsRoute
