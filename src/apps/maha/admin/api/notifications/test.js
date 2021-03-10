import { sendNotification } from '@apps/maha/services/notifications'

const testRoute = async (req, res) => {

  await new Promise((rs) => setTimeout(rs, 1000))

  await sendNotification(req, {
    user: req.user,
    notification: {
      subject: req.body.subject,
      body: req.body.body,
      route: req.body.route
    }
  })

  await res.status(200).respond(true)

}

export default testRoute
