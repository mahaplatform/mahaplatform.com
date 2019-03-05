import { Route } from '../../../server'

const activity = (req, trx, result, options) => ({
  story: 'changed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'alert preferences',
  object_type: null
})

const processor = async (req, trx, options) => {

  await options.knex('maha_users_alerts').transacting('trx').where({
    user_id: req.user.get('id')
  }).delete()

  await Promise.map(req.body.ignored, async (alert_id) => {

    await options.knex('maha_users_alerts').transacting('trx').insert({
      user_id: req.user.get('id'),
      alert_id
    })

  })

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
  path: '/alerts',
  processor
})

export default subscriptionsRoute
