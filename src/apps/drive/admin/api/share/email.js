import { sendMail } from '../../../../../web/core/services/email'
import { validate } from '../../../../../web/core/utils/validation'

const emailRoute = async (req, res) => {

  await validate({
    to: 'required',
    subject: 'required',
    message: 'required'
  }, req.body)

  await sendMail({
    from: `${req.user.get('full_name')} at ${req.team.get('title')}  <mailer@mahaplatform.com>`,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  })

  res.status(200).respond(true)

}

export default emailRoute
