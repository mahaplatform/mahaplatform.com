import { audit } from '@core/services/routes/audit'
import Refund from '@apps/finance/models/refund'
import Credit from '@apps/finance/models/credit'

export const refundCredit = async(req, { amount, payment }) => {

  const credit = await Credit.forge({
    team_id: req.team.get('id'),
    customer_id: payment.related('invoice').get('customer_id'),
    program_id: payment.related('invoice').get('program_id'),
    description: 'Refunded payment',
    amount
  }).save(null, {
    transacting: req.trx
  })

  const refund = await Refund.forge({
    team_id: req.team.get('id'),
    payment_id: payment.get('id'),
    credit_id: credit.get('id'),
    status: 'credited',
    type: 'credit',
    amount
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: credit
  })

  return refund

}
