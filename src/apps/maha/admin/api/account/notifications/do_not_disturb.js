import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'

const doNotDisturbRoute = async (req, res) => {

  await req.user.save({
    ...whitelist({
      ...req.body,
      ...req.body.mute
    }, ['notifications_enabled','mute_evenings','mute_evenings_end_time','mute_evenings_start_time','mute_weekends'])
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

export default doNotDisturbRoute
