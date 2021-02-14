import { personalizeEmail } from '@apps/automation/services/email'
import { sendEmail } from '@apps/maha/services/emails'
import User from '@apps/maha/models/user'
import { getNext } from '../utils'

const emailStep = async (req, { config, state, step, tokens }) => {

  const user = await User.query(qb => {
    qb.where('id', step.config.user_id)
  }).fetch({
    transacting: req.trx
  })

  const rendered = personalizeEmail(req, {
    subject: step.config.subject,
    html: step.config.body,
    data: tokens
  })

  const email = await sendEmail(req, {
    team_id: req.team.get('id'),
    user,
    from: req.team.get('rfc822'),
    to: user ? user.get('rfc822') : step.config.email,
    subject: rendered.subject,
    html: rendered.html.replace('\n', '<br />')
  })

  return {
    action: {
      email_id: email.get('id')
    },
    next: getNext(req, { config, state })
  }

}

export default emailStep
