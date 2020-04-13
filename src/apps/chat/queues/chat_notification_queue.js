import MessageSerializer from '../serializers/message_serializer'
import { sendNotification } from '../../maha/services/notifications'
import Queue from '../../../core/objects/queue'
import Subscription from '../models/subscription'
import Message from '../models/message'

const processor = async (req, job) => {

  const message = await Message.where({
    id: job.data.message_id
  }).fetch({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  const subscriptions = await Subscription.query(qb => {
    qb.where('channel_id', message.get('channel_id'))
    qb.whereRaw('id != ?', message.get('user_id'))
    qb.whereRaw('last_viewed_at < ?', message.get('created_at'))
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })


  if(subscriptions.length === 0) return true

  const serialized = MessageSerializer(null, message)

  await Promise.map(subscriptions.toArray(), async (subscription) => {
    await _sendMessage(req, {
      user: subscription.related('user'),
      message: serialized
    })
  })

}

const _sendMessage = async (req, { user, message }) => {
  await sendNotification(req, {
    user,
    notification: {
      title: `New Message from ${message.user.full_name}`,
      type: 'chat:message_received',
      body: message.text,
      route: `/admin/chat/channels/${message.channel_id}`,
      user: message.user,
      created_at: message.created_at
    }
  })
}

const ChatNotificationQueue = new Queue({
  name: 'chat_notification',
  processor
})

export default ChatNotificationQueue
