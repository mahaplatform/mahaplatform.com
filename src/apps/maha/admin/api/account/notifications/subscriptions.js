import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'

const subscriptionsRoute = async (req, res) => {

  await req.trx('maha_users_notification_types')
    .where('user_id', req.user.get('id'))
    .delete()

  await req.trx('maha_users_notification_types')
    .insert(req.body.ignored.map(item => ({
      user_id: req.user.get('id'),
      ...item
    })))

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'notification subscriptions',
    object_type: null
  })

  res.status(200).respond(true)

}

export default subscriptionsRoute
