import ChatNotificationQueue from '../../../queues/chat_notification_queue'
import MessageSerializer from '../../../serializers/message_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Attachment from '../../../../maha/models/attachment'
import { getUnread } from '../../../services/messages'
import knex from '../../../../../core/services/knex'
import User from '../../../../maha/models/user'
import Message from '../../../models/message'
import moment from 'moment'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['quoted_message_id','code','text','link_id'])

  const data = _.omitBy(allowed, _.isNil)

  const message = await Message.forge({
    channel_id: req.params.channel_id,
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    device_id: req.device.get('id'),
    message_type_id: 2,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await knex('chat_subscriptions').transacting(req.trx).where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).update({
    last_message_id: message.get('id'),
    last_viewed_at: moment()
  })

  await knex('chat_channels').transacting(req.trx).where({
    id: req.params.channel_id
  }).update({
    last_message_id: message.get('id'),
    last_message_at: moment()
  })

  await Promise.mapSeries(req.body.attachments, async (attachment, index) => {
    await Attachment.forge({
      team_id: req.team.get('id'),
      type: 'asset',
      attachable_type: 'chat_messages',
      attachable_id: message.get('id'),
      delta: index,
      caption: attachment.caption,
      asset_id: attachment.asset_id
    }).save(null, {
      transacting: req.trx
    })
  })

  await ChatNotificationQueue.enqueue(req, req.trx, message.get('id'))

  await message.load(['attachments.asset.source','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service'], {
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
    data: MessageSerializer(req, req.trx, message)
  }))

  const updateUnread = await Promise.map(subscription_ids, async user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'update_unread',
    data: await getUnread(user_id, req.trx)
  }))

  await socket.message(req, [
    ...addMessage,
    ...updateUnread
  ])

  res.status(200).respond(message, (message) => {
    return MessageSerializer(req, req.trx, message)
  })

}

export default createRoute
