import { pushFirebaseNotification } from '../../../services/notifications'
import { Route } from '../../../server'

const processor = async (req, trx, options) => {

  await req.device.load(['platform_type'], { transacting: trx })

  await pushFirebaseNotification(req.session, req.device, {
    title: 'Test Push Notification',
    body: 'this is a test push notification'
  }, trx)

  return true

}

const pushRoute = new Route({
  method: 'post',
  path: '/push',
  processor
})

export default pushRoute
