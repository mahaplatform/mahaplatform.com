import { sendMail } from '@core/services/email'
import { validate } from '@core/utils/validation'

const emailRoute = async (req, res) => {

  await validate({
    to: 'required',
    subject: 'required',
    message: 'required'
  }, req.body)

  await sendMail({
    from: `${req.user.get('full_name')} at ${req.team.get('title')} <${req.team.get('email')}>`,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  })

  await res.status(200).respond(true)

}

export default emailRoute
