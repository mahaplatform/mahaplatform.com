import { pushFirebaseNotification } from '@apps/maha/services/notifications'

const pushRoute = async (req, res) => {

  await req.device.load(['platform_type'], {
    transacting: req.trx
  })

  await pushFirebaseNotification(req.session, req.device, {
    title: 'Test Push Notification',
    body: 'this is a test push notification'
  }, req.trx)

  res.status(200).respond(true)

}

export default pushRoute
