import RefundSerializer from '@apps/finance/serializers/refund_serializer'
import Payment from '@apps/finance/models/payment'
import Refund from '@apps/finance/models/refund'

const listRoute = async (req, res) => {

  const payment = await Payment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.payment_id)
  }).fetch({
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  const refunds = await Refund.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('payment_id', payment.get('id'))
      qb.orderBy('created_at', 'desc')
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(refunds, RefundSerializer)

}

export default listRoute
