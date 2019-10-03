import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'

const preferencesRoute = async (req, res) => {

  await req.user.save({
    ...whitelist(req.body, ['in_app_notifications_enabled','notification_sound_enabled','notification_sound','push_notifications_enabled','email_notifications_method'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'notification preferences',
    object_type: null
  })

  res.status(200).respond(true)

}

export default preferencesRoute
