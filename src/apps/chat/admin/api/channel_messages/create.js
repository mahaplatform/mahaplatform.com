import ChatNotificationQueue from '../../../queues/chat_notification_queue'
import MessageSerializer from '../../../serializers/message_serializer'
import Subscription from '../../../models/subscription'
import { getUnread } from '../../../services/messages'
import { Route, User, Attachment } from 'maha'
import Message from '../../../models/message'
import moment from 'moment'
import _ from 'lodash'

const loadSubscriptions = async (req, trx, result, options) => {

  const subscriptions = await User.query(qb => {

    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')

    qb.where('chat_subscriptions.channel_id', req.params.channel_id)

    qb.whereNot('chat_subscriptions.user_id', req.user.get('id'))

  }).fetchAll({
    transacting: trx
  })

  req.subscription_ids = subscriptions.toArray().map(user => user.get('id'))

}

const updateLastViewed = async (req, trx, result, options) => {

  req.subscription = await Subscription.where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).fetch({ transacting: trx })

  const last_message_id = result.records ? result.records[0].id : result.id

  if(last_message_id < req.subscription.get('last_message_id')) return

  await req.subscription.save({
    last_message_id,
    last_viewed_at: moment()
  }, { transacting: trx })

}

const updateLastMessage = async (req, trx, result, options) => {

  await options.knex('chat_channels').transacting(trx).where({
    id: req.params.channel_id
  }).update({
    last_message_id: result.id,
    last_message_at: moment()
  })

}

const addAttachments = async (req, trx, result, options) => {

  await Promise.mapSeries(req.body.attachments, async (attachment, index) => {

    await Attachment.forge({
      team_id: req.team.get('id'),
      type: 'asset',
      attachable_type: 'chat_messages',
      attachable_id: result.get('id'),
      delta: index,
      caption: attachment.caption,
      asset_id: attachment.asset_id
    }).save(null, { transacting: trx })

  })

}

const queueNotification = async (req, trx, result, options) => {

  await ChatNotificationQueue.enqueue(req, trx, result.get('id'))

}

const addMessage = async (req, trx, result, options) => {

  const subscription_ids = [
    ...req.subscription_ids,
    req.user.get('id')
  ]

  return subscription_ids.map(user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'add_message',
    data: MessageSerializer(req, trx, result)
  }))

}

const updateUnread = async (req, trx, result, options) => {

  return await Promise.map(req.subscription_ids, async user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'update_unread',
    data: await getUnread(user_id, trx)
  }))

}

const messages = async (req, trx, result, options) => [
  ...await addMessage(req, trx, result, options),
  ...await updateUnread(req, trx, result, options)
]

const processor = async (req, trx, options) => {

  const allowed = _.pick(req.body, ['quoted_message_id','code','text','link_id'])

  req.resource = await Message.forge({
    channel_id: req.params.channel_id,
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    device_id: req.device.get('id'),
    message_type_id: 2,
    ...allowed
  }).save(null, {
    transacting: trx
  })

  return req.resource

}

const afterProcessor = async (req, trx, result, options) => {

  await loadSubscriptions(req, trx, result, options)

  await updateLastViewed(req, trx, result, options)

  await updateLastMessage(req, trx, result, options)

  await addAttachments(req, trx, result, options)

  await queueNotification(req, trx, result, options)

  await result.load(['attachments.asset.source','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service'], {
    transacting: trx
  })

}

const createRoute = new Route({
  afterProcessor,
  messages,
  method: 'post',
  path: '',
  processor,
  serializer: MessageSerializer
})

export default createRoute
