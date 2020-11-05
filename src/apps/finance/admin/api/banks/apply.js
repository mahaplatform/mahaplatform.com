import { renderTemplate } from '@apps/maha/services/emails'
import socket from '@core/services/routes/emitter'
import { sendMail } from '@core/services/email'
import Bank from '@apps/finance/models/bank'
import moment from 'moment'

const applyRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  const { subject, html } = await renderTemplate(req, {
    template: 'finance:braintree',
    data: {
      team: {
        title: req.team.get('title')
      },
      account: {
        full_name: req.account.get('full_name'),
        email: req.user.get('email'),
        cell_phone: req.user.get('cell_phone')
      }
    }
  })

  await sendMail({
    from: 'Greg Kops <gmk8@cornell.edu>',
    to: 'jbrown2@paypal.com',
    cc: 'gmk8@cornell.edu',
    reply_to: req.user.get('email'),
    subject,
    html
  })

  await bank.save({
    applied_on: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/finance/banks/${bank.get('id')}`
  ])

  res.status(200).respond(true)

}

export default applyRoute
