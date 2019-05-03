import { Route } from '../../../../../core/backframe'
import _ from 'lodash'

const activity = (req, trx, result, options) => ({
  story: 'changed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'notification preferences',
  object_type: null
})

const processor = async (req, trx, options) => {

  const picker = (value) => !_.isNil(value)

  await req.user.save(_.pickBy({
    notifications_enabled: req.body.notifications_enabled,
    mute_evenings: req.body.mute.mute_evenings,
    mute_evenings_end_time: req.body.mute.mute_evenings_end_time,
    mute_evenings_start_time: req.body.mute.mute_evenings_start_time,
    mute_weekends: req.body.mute.mute_weekends
  }, picker), { patch: true, transacting: trx })

  return {}

}

const messages = (req, trx, result, options) => ({
  channel: 'user',
  action: 'session'
})

const doNotDisturbRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '/do_not_disturb',
  processor
})

export default doNotDisturbRoute
