import { sendViaFirebase } from '@apps/maha/services/notifications/deliver'
import { sendNotification } from '@apps/maha/services/notifications'

const testRoute = async (req, res) => {

  await new Promise((rs) => setTimeout(rs, 1000))

  if(req.body.type === 'firebase') {
    await sendViaFirebase(req, {
      user: req.user,
      session: req.session,
      device: req.device,
      notification: {
        subject: req.body.subject,
        body: req.body.body,
        route: req.body.route
      }
    })
  } else {
    await sendNotification(req, {
      user: req.user,
      notification: {
        subject: req.body.subject,
        body: req.body.body,
        route: req.body.route
      }
    })
  }

  res.status(200).respond(true)

}

export default testRoute
