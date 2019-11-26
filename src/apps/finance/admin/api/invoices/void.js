import Invoice from '../../../models/invoice'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'

const voidRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  await invoice.save(whitelist(req.body, ['voided_date','voided_reason']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'voided {object}',
    object: invoice
  })

  await socket.refresh(req, [
    '/admin/finance/invoices',
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(true)

}

export default voidRoute
