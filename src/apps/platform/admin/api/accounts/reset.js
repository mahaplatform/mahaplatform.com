import { createUserToken } from '@core/utils/user_tokens'
import { renderTemplate } from '@apps/maha/services/emails'
import { sendMail } from '@core/services/email'
import Account from '@apps/maha/models/account'

const resetRoute = async (req, res) => {

  const account = await Account.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  const token = createUserToken(account, 'reset_id')

  const { subject, html } = await renderTemplate(req, {
    template: 'team:reset',
    data: {
      first_name: account.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/reset/${token}`
    }
  })

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: account.get('rfc822'),
    reply_to: 'no-reply@mahaplatform.com',
    subject,
    html
  })

  res.status(200).respond(true)

}

export default resetRoute
