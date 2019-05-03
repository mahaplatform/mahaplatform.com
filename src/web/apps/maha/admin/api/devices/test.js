import { Route } from '../../../../../core/backframe'
import NotificationQueue from '../../../queues/notification_queue'

const processor = async (req, trx, options) => {

  NotificationQueue.enqueue(req, trx, 19819)

}

const pushRoute = new Route({
  authenticated: false,
  method: 'post',
  path: '/:id/test',
  processor
})

export default pushRoute
