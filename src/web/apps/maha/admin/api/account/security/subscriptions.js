import { activity } from '../../../../../../core/services/routes/activities'
import socket from '../../../../../../core/services/routes/emitter'
import knex from '../../../../../../core/services/knex'

const subscriptionsRoute = async (req, res) => {

  await knex('maha_users_alerts').transacting('trx').where({
    user_id: req.user.get('id')
  }).delete()

  await knex('maha_users_alerts').transacting('trx').insert(req.body.ignored.map(alert_id => ({
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
