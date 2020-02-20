import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import RefundSerializer from '../../../../serializers/refund_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import braintree from '../../../../../../core/services/braintree'
import Payment from '../../../../models/payment'
import Credit from '../../../../models/credit'
import Refund from '../../../../models/refund'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const payment = await Payment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.payment_id)
  }).fetch({
    withRelated: ['invoice','refunds'],
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  if(Number(req.body.amount) > Number(payment.get('refundable'))) return res.status(404).respond({
    code: 422,
    message: 'Invalid amount'
  })

  const result = _.includes(['ach','card'], req.body.type) ? await new Promise((resolve, reject) => {
    braintree.transaction.refund(payment.get('braintree_id'), req.body.amount, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  }) : null

  const credit = req.body.type === 'credit' ? await Credit.forge({
    team_id: req.team.get('id'),
    customer_id: payment.related('invoice').get('customer_id'),
    description: 'Refunded payment',
    ...whitelist(req.body, ['amount'])
  }).save(null, {
    transacting: req.trx
  }) : null

  const refund = await Refund.forge({
    team_id: req.team.get('id'),
    payment_id: payment.get('id'),
    credit_id: credit ? credit.get('id') : null,
    braintree_id: result ? result.transaction.id : null,
    status: result ? 'submitted' : null,
    ...whitelist(req.body, ['type','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: refund
  })

  await socket.refresh(req, [
    '/admin/finance/payments',
    `/admin/finance/payments/${payment.get('id')}`,
    '/admin/finance/refunds'
  ])

  res.status(200).respond(refund, RefundSerializer)

}

export default createRoute
