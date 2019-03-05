import { Route } from '../../../server'

const activity = (req, trx, result, options) => ({
  story: 'changed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'notification subscriptions',
  object_type: null
})

const processor = async (req, trx, options) => {

  await options.knex('maha_users_notification_types').transacting('trx').where({
    user_id: req.user.get('id')
  }).delete()

  await options.knex('maha_users_notification_types').transacting('trx').insert(req.body.ignored.map(item => ({
    user_id: req.user.get('id'),
    ...item
  })))

  return {}

}

const messages = (req, trx, result, options) => ({
  channel: 'user',
  action: 'session'
})

const subscriptionsRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '/subscriptions',
  processor
})

export default subscriptionsRoute
