import MessageSerializer from '../../../serializers/message_serializer'
import Subscription from '../../../models/subscription'
import { getUnread } from '../../../services/messages'
import Message from '../../../models/message'
import { ListRoute, User } from 'maha'
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

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ channel_id: req.params.channel_id })

}

const updateAllRead = async (req, trx, result, options) => {

  const subscription_ids = [
    ...req.subscription_ids,
    req.user.get('id')
  ]

  return subscription_ids.map(user_id => ({
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
  ...await updateAllRead(req, trx, result, options),
  await updateUserUnread(req, trx, result, options)
]

const listRoute = new ListRoute({
  afterProcessor,
  defaultQuery,
  defaultSort: '-created_at',
  messages,
  model: Message,
  method: 'get',
  path: '',
  serializer: MessageSerializer,
  withRelated: ['attachments.asset.source','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service']
})

export default listRoute
