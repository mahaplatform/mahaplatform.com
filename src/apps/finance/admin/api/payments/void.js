import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import RouteError from '@core/objects/route_error'
import braintree from '@core/vendor/braintree'
import Payment from '@apps/finance/models/payment'
import _ from 'lodash'

const voidRoute = async (req, res) => {

  const payment = await Payment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  if(_.includes(['settled','disbused'], payment)) {
    throw new RouteError({
      status: 422,
      message: 'Unable to void payment',
      errors: {
        voided_date: ['Cannot void a settled payment']
      }
    })
  }

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

  await audit(req, {
    story: 'voided',
    auditable: payment
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
