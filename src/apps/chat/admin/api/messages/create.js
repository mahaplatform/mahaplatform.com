import SendChatNotificationQueue from '@apps/chat/queues/send_chat_notification_queue'
import MessageSerializer from '@apps/chat/serializers/message_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Attachment from '@apps/maha/models/attachment'
import { getUnread } from '@apps/chat/services/messages'
import User from '@apps/maha/models/user'
import Message from '@apps/chat/models/message'
import moment from 'moment'

const createRoute = async (req, res) => {

  const message = await Message.forge({
    channel_id: req.params.channel_id,
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    device_id: req.device.get('id'),
    message_type_id: 2,
    ...whitelist(req.body, ['quoted_message_id','code','text','link_id'])
  }).save(null, {
    transacting: req.trx
  })

  await req.trx('chat_subscriptions').where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).update({
    last_message_id: message.get('id'),
    last_viewed_at: moment()
  })

  await req.trx('chat_channels').where({
    id: req.params.channel_id
  }).update({
    last_message_id: message.get('id'),
    last_message_at: moment()
  })

  await Promise.mapSeries(req.body.asset_ids, async (asset_id, index) => {
    await Attachment.forge({
      team_id: req.team.get('id'),
      type: 'asset',
      attachable_type: 'chat_messages',
      attachable_id: message.get('id'),
      delta: index,
      asset_id
    }).save(null, {
      transacting: req.trx
    })
  })

  await SendChatNotificationQueue.enqueue(req, {
    message_id: message.get('id')
  })

  await message.load(['attachments.asset','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service'], {
    transacting: req.trx
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

  const addMessage = [
    ...subscription_ids,
    req.user.get('id')
  ].map(user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'add_message',
    data: MessageSerializer(req, message)
  }))

  const updateUnread = await Promise.map(subscription_ids, async user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'update_unread',
    data: await getUnread(req, user_id)
  }))

  await socket.message(req, [
    ...addMessage,
    ...updateUnread
  ])

  res.status(200).respond(message, MessageSerializer)

}

export default createRoute
