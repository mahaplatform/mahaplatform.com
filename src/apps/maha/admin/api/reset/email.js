import { createUserToken } from '@core/utils/user_tokens'
import { validate } from '@core/utils/validation'
import { sendMail } from '@core/services/email'
import { renderTemplate } from '@apps/maha/services/emails'
import Account from '@apps/maha/models/account'

const emailRoute = async (req, res, next) => {

  await validate({
    email: 'required'
  }, req.body)

  const account = await Account.where({
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  const token = createUserToken({
    reset_id: account.get('id')
  })

  const { subject, html } = await renderTemplate(req, {
    template: 'team:reset',
    data: {
      first_name: account.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/reset/${token}`
    }
  })

  await sendMail({
    from: req.team.get('rfc822'),
    to: account.get('rfc822'),
    reply_to: 'no-reply@mahaplatform.com',
    subject,
    html
  })

  await res.status(200).respond(true)

}

export default emailRoute
