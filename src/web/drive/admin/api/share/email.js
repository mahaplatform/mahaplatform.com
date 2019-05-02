import { Route, sendMail } from 'maha'

const processor = async (req, trx, options) => {

  await sendMail({
    from: `${req.user.get('full_name')} at ${req.team.get('title')}  <mailer@mahaplatform.com>`,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  })
}

const emailRoute = new Route({
  method: 'post',
  path: '/email',
  processor,
  rules: {
    to: 'required',
    subject: 'required',
    message: 'required'
  }
})

export default emailRoute
