import MessageSerializer from '../../../serializers/message_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Subscription from '../../../models/subscription'
import { getUnread } from '../../../services/messages'
import User from '../../../../maha/models/user'
import Message from '../../../models/message'
import moment from 'moment'

const listRoute = async (req, res) => {

  const messages = await Message.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('channel_id', req.params.channel_id)
  }).filter({
    filter: req.query.$filter,
    searchParams: ['text']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['id','first_name','last_name','email','created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['attachments.asset.source','message_type','user.photo','reactions.user.photo','stars','quoted_message.user.photo','link.service'],
    transacting: req.trx
  })

  await req.trx('chat_subscriptions').where({
    channel_id: req.params.channel_id,
    user_id: req.user.get('id')
  }).update({
    last_message_id: messages.toArray()[0].get('id'),
    last_viewed_at: moment()
  })

  const subscription_ids = await User.query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')
    qb.where('chat_subscriptions.channel_id', req.params.channel_id)
    qb.whereNot('chat_subscriptions.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(subscriptions => [
    req.user.get('id'),
    ...subscriptions.toArray().map(user => {
      return user.get('id')
    })
  ])

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
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/chat/messages',
    action: 'update_unread',
    data: await getUnread(req, req.user.get('id'))
  }

  await socket.message(req, [
    ...updateRead,
    updateUnread
  ])

  res.status(200).respond(messages, MessageSerializer)

}

export default listRoute
