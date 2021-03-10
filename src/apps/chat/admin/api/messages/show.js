import MessageSerializer from '@apps/chat/serializers/message_serializer'
import socket from '@core/services/routes/emitter'
import Subscription from '@apps/chat/models/subscription'
import { getUnread } from '@apps/chat/services/messages'
import User from '@apps/maha/models/user'
import Message from '@apps/chat/models/message'
import moment from 'moment'

const showRoute = async (req, res) => {

  const message = await Message.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['attachments.asset','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service']
  })

  if(!message) return res.status(404).respond({
    code: 404,
    message: 'Unable to load message'
  })

  await req.trx('chat_subscriptions').where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).update({
    last_message_id: message.get('id'),
    last_viewed_at: moment()
  })

  const subscription_ids = await User.query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')
    qb.where('chat_subscriptions.channel_id', req.params.channel_id)
    qb.whereNot('chat_subscriptions.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(subscriptions => subscriptions.toArray().map(user => {
    return user.get('id')
  }))

  const subscription = await Subscription.where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).fetch({
    transacting: req.trx
  })

  const updateRead = subscription_ids.map(user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'update_read',
    data: {
      channel_id: subscription.get('channel_id'),
      user_id: req.user.get('id'),
      message: {
        id: subscription.get('last_message_id'),
        viewed_at: subscription.get('last_viewed_at')
      }
    }
  }))

  const updateUnread = {
    channel: 'user',
    target: '/admin/chat/messages',
    action: 'update_unread',
    data: await getUnread(req, req.user.get('id'))
  }

  await socket.message(req, [
    ...updateRead,
    updateUnread
  ])

  await res.status(200).respond(message, MessageSerializer)

}

export default showRoute
