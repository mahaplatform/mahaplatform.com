import { sendViaFirebase } from '@apps/maha/services/notifications/deliver'
import { sendNotification } from '@apps/maha/services/notifications'
import _ from 'lodash'

const testRoute = async (req, res) => {

  if(req.body.type === 'firebase') {
    await sendViaFirebase(req, {
      user: req.user,
      session: req.session,
      device: req.device,
      notification: {
        title: req.body.title,
        body: req.body.body,
        code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
        route: req.body.route
      }
    })
  } else {
    await sendNotification(req, {
      user: req.user,
      notification: {
        title: req.body.title,
        body: req.body.body,
        code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
        route: req.body.route
      }
    })
  }

  res.status(200).respond(true)

}

export default testRoute
