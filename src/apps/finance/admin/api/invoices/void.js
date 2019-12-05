import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import RouteError from '../../../../../core/objects/route_error'
import socket from '../../../../../core/services/routes/emitter'
import Invoice from '../../../models/invoice'

const voidRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['payments'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  if(invoice.related('payments').length > 0) {
    throw new RouteError({
      status: 422,
      message: 'Unable to void invoice',
      errors: {
        voided_date: ['Cannot void invoice after a payment has been received']
      }
    })
  }

  await invoice.save({
    status: 'voided',
    ...whitelist(req.body, ['voided_date','voided_reason'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'voided',
    auditable: invoice
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
