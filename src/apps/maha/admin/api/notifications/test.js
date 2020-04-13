import { sendNotification } from '../../../services/notifications'

const testRoute = async (req, res) => {

  await sendNotification(req, {
    user: req.user,
    notification: {
      title: 'New Notification',
      body: 'body',
      route: '/admin'
    }
  })

  res.status(200).respond(true)

}

export default testRoute
