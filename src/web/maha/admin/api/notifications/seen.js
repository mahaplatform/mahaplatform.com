import { Route } from '../../../server'
import Notification from '../../../models/notification'

const processor = async (req, trx, options) => {

  if(!req.body.ids) return {}

  await Notification.query().whereIn('id', req.body.ids).transacting(trx).update({ is_seen: true })

  return true

}

const refresh = (req, trx, result, options) => [
  { channel: '/admin/user', target: '/admin/notifications' }
]

const seenRoute = new Route({
  path: '/seen',
  method: 'patch',
  processor,
  refresh
})

export default seenRoute
