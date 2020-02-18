import { sendMail } from '../../../../../core/services/email'
import { renderEmail, personalizeEmail } from '../../../services/email'

const previewRoute = async (req, res) => {

  const { config, first_name, last_name, email } = req.body

  const html = renderEmail(req, { config })

  const rendered = personalizeEmail(req, {
    subject: `PREVIEW: ${config.settings.subject}`,
    html: html,
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
    from: 'Maha <mailer@mahaplatform.com>',
    to: req.body.email,
    subject: rendered.subject,
    html: rendered.html
  })

  res.status(200).respond(true)

}

export default previewRoute
