import { renderEmail, personalizeEmail } from '../../../services/email'
import { sendMail } from '../../../../../core/services/email'
import Sender from '../../../../crm/models/sender'
import User from '../../../../maha/models/user'

const getContact = async (req, params) => {
  const { strategy, user_id, email, first_name, last_name } = params
  if(strategy === 'email') {
    return { email, first_name, last_name }
  }
  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
  return {
    first_name: user.get('first_name'),
    last_name: user.get('last_name'),
    email: user.get('email')
  }
}

const previewRoute = async (req, res) => {

  const { config } = req.body

  const html = await renderEmail(req, { config })

  const sender = config.settings.sender_id ? await Sender.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const { first_name, last_name, email } = await getContact(req, req.body)

  const rendered = personalizeEmail(req, {
    subject: `PREVIEW: ${config.settings.subject}`,
    html,
    data: {
      contact: {
        full_name: `${first_name} ${last_name}`,
        first_name,
        last_name,
        email
      },
      email: {
        facebook_link: '#',
        twitter_link: '#',
        forward_link: '#',
        linkedin_link: '#',
        pinterest_link: '#',
        web_link: '#',
        preferences_link: '#'
      }
    }
  })

  await sendMail({
    from: sender ? sender.get('rfc822') : 'Maha Platform <mail@mahaplatform.com>',
    to: email,
    subject: rendered.subject,
    html: rendered.html
  })

  res.status(200).respond(true)

}

export default previewRoute
