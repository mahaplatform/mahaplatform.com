import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotification } from '../services/notifications'
import Notification from '../models/notification'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, id) => ({ id })

const processor = async (job, trx) => {

  const notification = await Notification.where({
    id: job.data.id
  }).fetch({
    withRelated: ['app','notification_type','object_owner','subject.photo','story','team','user','user.photo'],
    transacting: trx
  })

  const serialized = NotificationSerializer(null, trx, notification)

  await sendNotification(notification.related('user'), {
    id: serialized.id,
    title: 'New Notification',
    type: notification.get('type'),
    body: serialized.description,
    route: serialized.url,
    user: serialized.subject,
    created_at: serialized.created_at
  }, trx)

  return job.data.id

}

const notificationQueue = new Queue({
  name: 'notification',
  enqueue,
  processor
})

export default notificationQueue
