import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import braintree from '../../../../../core/services/braintree'
import Payment from '../../../models/payment'

const voidRoute = async (req, res) => {

  const payment = await Payment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  if(payment.get('braintree_id') && payment.get('status') !== 'captured') return res.status(422).send({
    errors: {
      voided_date: ['cannot void a payment once it has been settled']
    },
    message: 'Unable to void payment',
    status: 422
  })

  if(payment.get('braintree_id')) {
    await braintree.transaction.void(payment.get('braintree_id'))
  }

  await payment.save({
    status: 'voided',
    ...whitelist(req.body, ['voided_date','voided_reason'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'voided {object}',
    object: payment
  })

  await socket.refresh(req, [
    '/admin/finance/payments',
    `/admin/finance/payments/${payment.get('id')}`,
    '/admin/finance/invoices',
    `/admin/finance/invoices/${payment.get('invoice_id')}`
  ])

  res.status(200).respond(true)

}

export default voidRoute
