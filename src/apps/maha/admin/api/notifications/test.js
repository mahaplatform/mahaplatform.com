import { sendNotification } from '../../../services/notifications'
import _ from 'lodash'

const testRoute = async (req, res) => {

  await sendNotification(req, {
    user: req.user,
    notification: {
      title: 'New Notification',
      body: 'body',
      route: '/admin',
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    }
  })

  res.status(200).respond(true)

}

export default testRoute
