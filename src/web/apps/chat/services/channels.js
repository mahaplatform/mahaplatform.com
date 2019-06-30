import formatObjectForTransport from '../../../core/utils/format_object_for_transport'
import ChatNotificationQueue from '../queues/chat_notification_queue'
import { extractAttachments } from '../../maha/services/attachments'
import ChannelSerializer from '../serializers/channel_serializer'
import MessageSerializer from '../serializers/message_serializer'
import generateCode from '../../../core/utils/generate_code'
import socket from '../../../core/services/emitter'
import Subscription from '../models/subscription'
import MessageType from '../models/message_type'
import knex from '../../../core/services/knex'
import User from '../../maha/models/user'
import Channel from '../models/channel'
import Message from '../models/message'
import moment from 'moment'

export const toOxfordList = (array) => {
  return (array.length < 3) ? array.join(' and ') : array.slice(0, -1).join(', ') + ', and ' + array.slice(-1)
}

export const createChannel = async (req, user_ids) => {

  const channel = await Channel.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    code: generateCode(),
    last_message_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  await channel.load(['owner.photo','subscriptions.user.photo','last_message'], {
    transacting: req.trx
  })

  const users = await User.query(qb => qb.whereIn('id', [
    req.user.get('id'),
    ...user_ids
  ])).fetchAll({
    transacting: req.trx
  })

  const user_list = users.filter(user => {
    return user.get('id') !== req.user.get('id')
  }).map(user => {
    return user.get('full_name')
  })

  await Promise.map(users.toArray(), async (user) => {

    await Subscription.forge({
      team_id: req.team.get('id'),
      channel_id: channel.get('id'),
      user_id: user.get('id'),
      last_viewed_at: moment().subtract(10, 'minutes')
    }).save(null, {
      transacting: req.trx
    })

    return user

  })

  await channel.save({
    subscriber_list: users.map(user => user.get('full_name')).join(' ')
  }, {
    patch: true,
    transacting: req.trx
  })

  const serialized = ChannelSerializer(req, channel)

  await Promise.map(users.toArray(), async user => {

    await socket.in(`/admin/users/${user.get('id')}`).emit('message', {
      target: '/admin/chat/messages',
      action: 'add_channel',
      data: {
        channel: formatObjectForTransport(serialized)
      }
    })

  })

  await createMessage(req, {
    channel_id: channel.get('id'),
    type: 'action',
    text: `started conversation with ${toOxfordList(user_list)}`
  })

  return channel

}

export const createMessage = async (req, params) => {

  const { channel_id, type, text } = params

  const message_type = await MessageType.where({
    text: type
  }).fetch({
    transacting: req.trx
  })

  const message = await Message.forge({
    team_id: req.team.get('id'),
    channel_id,
    user_id: req.user.get('id'),
    message_type_id: message_type.get('id'),
    code: generateCode(),
    text
  }).save(null, {
    transacting: req.trx
  })

  return message

}

export const sendMessage = async (req, params) => {

  const { channel_id, type, text } = params

  const message = await createMessage(req, { channel_id, type, text })

  await knex('chat_subscriptions').transacting(req.trx).where({
    user_id: req.user.get('id'),
    channel_id
  }).update({
    last_viewed_at: moment()
  })

  await knex('chat_channels').transacting(req.trx).where({
    id: channel_id
  }).update({
    last_message_id: message.get('id'),
    last_message_at: moment()
  })

  const sanitized = text.replace('<p>','').replace('</p>', '\r\n')

  await extractAttachments(req, message, sanitized)

  await message.load(['user.photo','attachments.asset.source','message_type'], {
    transacting: req.trx
  })

  const serialized = MessageSerializer(req, message)

  const users = await knex('maha_users').transacting(req.trx)
    .select('maha_users.*')
    .innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')
    .where('chat_subscriptions.channel_id', channel_id)

  await Promise.map(users, async user => {

    await socket.in(`/admin/users/${user.id}`).emit('message', {
      target: '/admin/chat/messages',
      action: 'add_message',
      data: formatObjectForTransport(serialized)
    })

  })

  await ChatNotificationQueue.enqueue(req, message.get('id'))

  return message

}

export const updateUnread = async () => {

  await socket.in('/admin/chat/unread').emit('message', {
    target: '/admin/chat/unread',
    action: 'refresh',
    data: null
  })

  await socket.in('/admin/chat/channels').emit('message', {
    target: '/admin/chat/channels',
    action: 'refresh',
    data: null
  })

}
