import braintree from '@core/vendor/braintree'
import Refund from '@apps/finance/models/refund'

export const refundBraintree = async(req, { amount, payment }) => {

  const result = await new Promise((resolve, reject) => {
    braintree.transaction.refund(payment.get('braintree_id'), req.body.amount, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })

  const refund = await Refund.forge({
    team_id: req.team.get('id'),
    payment_id: payment.get('id'),
    braintree_id: result.transaction.id,
    status: 'submitted',
    type: 'card',
    amount
  }).save(null, {
    transacting: req.trx
  })

  return refund

}
