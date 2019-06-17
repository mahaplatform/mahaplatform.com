import { sendMail } from '../../../../../core/services/email'
import Checkit from 'checkit'

const emailRoute = async (req, res) => {

  await Checkit({
    to: 'required',
    subject: 'required',
    message: 'required'
  }).run(req.body)

  await sendMail({
    from: `${req.user.get('full_name')} at ${req.team.get('title')}  <mailer@mahaplatform.com>`,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  })

  res.status(200).respond(true)

}

export default emailRoute
