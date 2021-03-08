import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'

const preferencesRoute = async (req, res) => {

  await req.account.save({
    preferences: {
      ...req.account.get('preferences'),
      ...whitelist({
        ...req.body,
        ...req.body.sounds,
        ...req.body.mute
      }, ['in_app_notifications_enabled','notification_sound_enabled','notification_sound','push_notifications_enabled','email_notifications_method','notifications_enabled','mute_evenings','mute_evenings_end_time','mute_evenings_start_time','mute_weekends'])
    }
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.message(req, {
    channel: 'account',
    action: 'account'
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
