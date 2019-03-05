import { Route } from '../../../server'
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
    in_app_notifications_enabled: req.body.in_app_notifications_enabled,
    notification_sound_enabled: req.body.sounds.notification_sound_enabled,
    notification_sound: req.body.sounds.notification_sound,
    push_notifications_enabled: req.body.push_notifications_enabled,
    email_notifications_method: req.body.email_notifications_method
  }, picker), { patch: true, transacting: trx })

  return {}

}

const messages = (req, trx, result, options) => ({
  channel: 'user',
  action: 'session'
})

const preferencesRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '/preferences',
  processor
})

export default preferencesRoute
