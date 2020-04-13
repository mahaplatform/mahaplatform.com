import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotification } from '../services/notifications'
import Notification from '../models/notification'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, id) => ({ id })

const processor = async (req, job) => {

  const notification = await Notification.where({
    id: job.data.id
  }).fetch({
    withRelated: ['app','notification_type','object_owner','subject.photo','story','team','user','user.photo'],
    transacting: req.trx
  })

  const serialized = NotificationSerializer(null, notification)

  await sendNotification(req, {
    user: notification.related('user'),
    notification: {
      id: serialized.id,
      title: 'New Notification',
      type: notification.get('type'),
      body: serialized.description,
      route: serialized.url,
      user: serialized.subject,
      created_at: serialized.created_at
    }
  })

  return job.data.id

}

const NotificationQueue = new Queue({
  name: 'notification',
  enqueue,
  processor
})

export default NotificationQueue
