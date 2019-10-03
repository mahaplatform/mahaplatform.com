import { activity } from '../../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../../web/core/services/routes/params'
import socket from '../../../../../../web/core/services/routes/emitter'

const doNotDisturbRoute = async (req, res) => {

  await req.user.save({
    ...whitelist(req.body, ['notifications_enabled','mute_evenings','mute_evenings_end_time','mute_evenings_start_time','mute_weekends'])
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
