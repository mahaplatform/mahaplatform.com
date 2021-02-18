import { personalizeEmail } from '@apps/automation/services/email'
import { sendEmail } from '@apps/maha/services/emails'
import User from '@apps/maha/models/user'
import { getNext } from '../utils'

const emailStep = async (req, { config, state, step, tokens }) => {

  const { user_id, subject, body, email } = step.config

  const user = user_id ? await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const rendered = personalizeEmail(req, {
    subject,
    html: body,
    data: tokens
  })

  const sent = await sendEmail(req, {
    team_id: req.team.get('id'),
    user,
    from: req.team.get('rfc822'),
    to: user ? user.get('rfc822') : email,
    subject: rendered.subject,
    html: rendered.html.replace('\n', '<br />')
  })

  return {
    action: {
      email_id: sent.get('id'),
      user_id
    },
    data: {
      email
    },
    next: getNext(req, { config, state })
  }

}

export default emailStep
