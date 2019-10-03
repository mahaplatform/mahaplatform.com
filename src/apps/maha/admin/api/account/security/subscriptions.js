import { activity } from '../../../../../../web/core/services/routes/activities'
import socket from '../../../../../../web/core/services/routes/emitter'

const subscriptionsRoute = async (req, res) => {

  await req.trx('maha_users_alerts').where('user_id', req.user.get('id')).del()

  await req.trx('maha_users_alerts').insert(req.body.ignored.map(alert_id => ({
    user_id: req.user.get('id'),
    alert_id
  })))

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'alert preferences',
    object_type: null
  })

  res.status(200).respond(true)

}

export default subscriptionsRoute
