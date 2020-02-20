import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Refund from '../../../models/refund'

const voidRoute = async (req, res) => {

  const refund = await Refund.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!refund) return res.status(404).respond({
    code: 404,
    message: 'Unable to load refund'
  })

  await refund.save(whitelist(req.body, ['voided_date','voided_reason']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'voided {object}',
    object: refund
  })

  await socket.refresh(req, [
    '/admin/finance/refunds',
    `/admin/finance/refunds/${refund.get('id')}`
  ])

  res.status(200).respond(true)

}

export default voidRoute
