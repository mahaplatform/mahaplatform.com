import { activity } from '../../../../../../core/services/routes/activities'
import socket from '../../../../../../core/services/routes/emitter'
import knex from '../../../../../../core/services/knex'

const subscriptionsRoute = async (req, res) => {

  await knex('maha_users_notification_types').transacting(req.trx).where({
    user_id: req.user.get('id')
  }).delete()

  await knex('maha_users_notification_types').transacting(req.trx).insert(req.body.ignored.map(item => ({
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

  res.status(200).respond({})

}

export default subscriptionsRoute
