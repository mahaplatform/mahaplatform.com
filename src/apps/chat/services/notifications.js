import MessageSerializer from '../serializers/message_serializer'
import { sendNotification } from '@apps/maha/services/notifications'
import Subscription from '../models/subscription'
import Message from '../models/message'

export const sendChatNotification = async (req, { message_id }) => {

  const message = await Message.where({
    id: message_id
  }).fetch({
    withRelated: ['team','user.photo'],
    transacting: req.trx
  })

  const subscriptions = await Subscription.query(qb => {
    qb.where('channel_id', message.get('channel_id'))
    qb.whereRaw('id != ?', message.get('user_id'))
    qb.whereRaw('last_viewed_at < ?', message.get('created_at'))
  }).fetchAll({
    withRelated: ['user.photo','team'],
    transacting: req.trx
  })

  if(subscriptions.length === 0) return true

  const serialized = MessageSerializer(null, message)

  await Promise.map(subscriptions.toArray(), async (subscription) => {
    await sendNotification(req, {
      user: subscription.related('user'),
      notification: {
        type: 'chat:message_received',
        body: `said ${serialized.text}`,
        route: `/chat/channels/${serialized.channel_id}`,
        subject: serialized.user,
        created_at: serialized.created_at
      }
    })
  })

}
