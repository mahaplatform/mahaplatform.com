import { renderEmail, personalizeEmail } from '../../../services/email'
import { sendMail } from '../../../../../core/services/email'
import Sender from '../../../models/sender'

const previewRoute = async (req, res) => {

  const { config, first_name, last_name, email } = req.body

  const html = await renderEmail(req, { config })

  const sender = await Sender.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

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
    from: sender.get('rfc822'),
    to: req.body.email,
    subject: rendered.subject,
    html: rendered.html
  })

  res.status(200).respond(true)

}

export default previewRoute
