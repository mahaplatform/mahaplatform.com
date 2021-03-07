import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotification } from '../services/notifications'
import Notification from '../models/notification'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const notification = await Notification.where({
    id: job.data.id
  }).fetch({
    withRelated: ['app','notification_type','object_owner','subject.photo','story','team','user.photo'],
    transacting: req.trx
  })

  const serialized = NotificationSerializer(null, notification)

  await sendNotification(req, {
    user: notification.related('user'),
    notification: {
      id: serialized.id,
      type: notification.get('type'),
      body: serialized.description,
      route: `/${notification.related('team').get('subdomain')}${serialized.url}`,
      subject: serialized.subject,
      created_at: serialized.created_at
    }
  })

  return job.data.id

}

const SendNotificationQueue = new Queue({
  queue: 'worker',
  name: 'send_notification',
  processor
})

export default SendNotificationQueue
