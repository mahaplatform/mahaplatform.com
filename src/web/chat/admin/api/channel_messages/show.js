import MessageSerializer from '../../../serializers/message_serializer'
import Subscription from '../../../models/subscription'
import { getUnread } from '../../../services/messages'
import { BackframeError, Route, User } from 'maha'
import Message from '../../../models/message'
import moment from 'moment'

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

const afterProcessor = async (req, trx, result, options) => {

  await loadSubscriptions(req, trx, result, options)

  await updateLastViewed(req, trx, result, options)

}

const updateRead = async (req, trx, result, options) => {

  return await Promise.map(req.subscription_ids, async user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'update_read',
    data: {
      channel_id: req.subscription.get('channel_id'),
      user_id: req.user.get('id'),
      message: {
        id: req.subscription.get('last_message_id'),
        viewed_at: req.subscription.get('last_viewed_at')
      }
    }
  }))

}

const updateUserUnread = async (req, trx, result, options) => ({
  channel: `/admin/users/${req.user.get('id')}`,
  target: '/admin/chat/messages',
  action: 'update_unread',
  data: await getUnread(req.user.get('id'), trx)
})

const messages = async (req, trx, result, options) => [
  ...await updateRead(req, trx, result, options),
  await updateUserUnread(req, trx, result, options)
]

const processor = async (req, trx, options) => {

  req.resource = await Message.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['attachments.asset.source','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service']
  })

  if(req.resource) return req.resource

  throw new BackframeError({
    code: 404,
    message: 'Unable to load record'
  })

}

const showRoute = new Route({
  afterProcessor,
  messages,
  method: 'get',
  path: '/:id',
  processor,
  serializer: MessageSerializer
})

export default showRoute
