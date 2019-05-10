import { activity } from '../../../../../../core/services/routes/activities'
import { message } from '../../../../../../core/services/routes/emitter'
import _ from 'lodash'

const doNotDisturbRoute = async (req, res) => {

  const picker = (value) => !_.isNil(value)

  await req.user.save(_.pickBy({
    notifications_enabled: req.body.notifications_enabled,
    mute_evenings: req.body.mute.mute_evenings,
    mute_evenings_end_time: req.body.mute.mute_evenings_end_time,
    mute_evenings_start_time: req.body.mute.mute_evenings_start_time,
    mute_weekends: req.body.mute.mute_weekends
  }, picker), {
    patch: true,
    transacting: req.trx
  })

  await message(req, {
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

  res.status(200).respond({})

}

export default doNotDisturbRoute
