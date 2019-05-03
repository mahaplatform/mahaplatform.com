import MessageSerializer from '../serializers/message_serializer'
import { sendNotification } from '../../maha/services/notifications'
import Queue from '../../../core/objects/queue'
import Subscription from '../models/subscription'
import Message from '../models/message'

const enqueue = async (req, trx, message_id) => ({ message_id })

const processor = async (job, trx) => {

  const message = await Message.where({
    id: job.data.message_id
  }).fetch({ withRelated: ['user.photo'], transacting: trx })

  const subscriptions = await Subscription.query(qb => {

    qb.where('channel_id', message.get('channel_id'))

    qb.whereRaw('id != ?', message.get('user_id'))

    qb.whereRaw('last_viewed_at < ?', message.get('created_at'))

  }).fetchAll({ withRelated: ['user.photo'], transacting: trx })

  if(subscriptions.length === 0) return true

  const serialized = MessageSerializer(null, trx, message)

  await Promise.map(subscriptions.toArray(), async (subscription) => {

    await _sendMessage(subscription.related('user'), serialized, trx)

  })

  return true

}

const _sendMessage = async (user, message, trx) => {

  await sendNotification(user, {
    title: `New Message from ${message.user.full_name}`,
    type: 'chat:message_received',
    body: message.text,
    route: `/admin/chat/channels/${message.channel_id}`,
    user: message.user,
    created_at: message.created_at
  }, trx)

}

const chatNotificationQueue = new Queue({
  name: 'chat_notification',
  enqueue,
  processor
})

export default chatNotificationQueue
