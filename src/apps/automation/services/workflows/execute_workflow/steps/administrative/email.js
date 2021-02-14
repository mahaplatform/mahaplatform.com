import { personalizeEmail } from '@apps/automation/services/email'
import generateCode from '@core/utils/generate_code'
import { sendMail } from '@core/services/email'
import { getEnrollmentData } from '../utils'
import Email from '@apps/maha/models/email'
import User from '@apps/maha/models/user'

const emailStep = async (req, params) => {

  const { config, enrollment } = params

  const user = await User.query(qb => {
    qb.where('id', config.user_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const data = await getEnrollmentData(req, {
    enrollment
  })

  const rendered = personalizeEmail(req, {
    subject: config.subject,
    html: config.body,
    data: {
      ...params.tokens,
      ...data
    }
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    user_id: user ? user.get('id') : null,
    from: req.team.get('rfc822'),
    to: user ? user.get('rfc822') : config.email,
    subject: rendered.subject,
    html: rendered.html,
    code,
    was_bounced: false,
    was_clicked: false,
    was_complained: false,
    was_delivered: false,
    was_opened: false,
    was_unsubscribed: false,
    was_webviewed: false
  }).save(null, {
    transacting: req.trx
  })

  await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    subject: email.get('subject'),
    html: email.get('html')
  })

  return {
    action: {
      email_id: email.get('id')
    }
  }

}

export default emailStep
