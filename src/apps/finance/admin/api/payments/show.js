import PaymentSerializer from '../../../serializers/payment_serializer'
import Payment from '../../../models/payment'

const showRoute = async (req, res) => {

  const payment = await Payment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['credit','disbursement.merchant','invoice.customer','merchant','refunds','scholarship'],
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  res.status(200).respond(payment, PaymentSerializer)

}

export default showRoute
