import { activity } from '../../../../../../core/services/routes/activities'
import socket from '../../../../../../core/services/routes/emitter'
import _ from 'lodash'

const preferencesRoute = async (req, res) => {

  const picker = (value) => !_.isNil(value)

  await req.user.save(_.pickBy({
    in_app_notifications_enabled: req.body.in_app_notifications_enabled,
    notification_sound_enabled: req.body.sounds.notification_sound_enabled,
    notification_sound: req.body.sounds.notification_sound,
    push_notifications_enabled: req.body.push_notifications_enabled,
    email_notifications_method: req.body.email_notifications_method
  }, picker), {
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
