import NotificationSerializer from '../../../serializers/notification_serializer'
import { Route } from '../../../server'

const processor = async (req, trx, options) => {

  const notification = await req.resource.save({
    is_visited: true
  }, { patch: true, transacting: trx })

  notification.load(['app','story','subject','user'], { transacting: trx })

  return NotificationSerializer(req, trx, notification)

}

const refresh = (req, trx, result, options) => [
  { channel: '/admin/user', target: '/admin/notifications' }
]

const visitedRoute = new Route({
  path: '/visited',
  method: 'patch',
  processor,
  refresh
})

export default visitedRoute
