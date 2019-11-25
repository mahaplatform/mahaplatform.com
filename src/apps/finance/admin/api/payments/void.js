import Invoice from '../../../models/payment'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'

const voidRoute = async (req, res) => {

  const payment = await Invoice.scope(qb => {
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

  await payment.save(whitelist(req.body, ['voided_at']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'voided {object}',
    object: payment
  })

  await socket.refresh(req, [
    '/admin/finance/payments',
    `/admin/finance/payments/${payment.get('id')}`
  ])

  res.status(200).respond(true)

}

export default voidRoute
