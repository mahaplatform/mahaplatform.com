import ChannelSerializer from '../../../serializers/channel_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { sendMessage } from '../../../services/channels'
import Subscription from '../../../models/subscription'
import User from '../../../../maha/models/user'
import Channel from '../../../models/channel'
import { toOxfordList } from '../../utils'
import moment from 'moment'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const channel = await Channel.where({
    id: req.params.id
  }).fetch({
    withRelated: ['subscriptions'],
    transacting: req.trx
  })

  const ids = channel.related('subscriptions').map(subscription => subscription.get('user_id'))

  const add_ids = req.body.ids.filter(id => {
    return !_.includes(ids, id)
  })

  const delete_ids = ids.filter(id => {
    return !_.includes(req.body.ids, id) && id !== req.user.get('id')
  })

  if(add_ids.length > 0) {

    await req.trx('chat_subscriptions').insert(add_ids.map(user_id => ({
      team_id: req.team.get('id'),
      channel_id: req.params.id,
      user_id,
      created_at: moment(),
      updated_at: moment(),
      last_viewed_at: moment()
    })))

    const add_users = await User.query(qb => {
      qb.whereIn('id', add_ids)
    }).fetchAll({
      transacting: req.trx
    })

    const add_list = add_users.map(user => user.get('full_name'))

    await sendMessage(req, {
      channel_id: req.params.id,
      type: 'action',
      text: `added ${toOxfordList(add_list)} to the conversation`
    })

  }

  if(delete_ids.length > 0) {

    await req.trx('chat_subscriptions').where({
      channel_id: req.params.id
    }).whereIn('user_id', delete_ids).delete()

    const delete_users = await User.query(qb => {
      qb.whereIn('id', delete_ids)
    }).fetchAll({
      transacting: req.trx
    })

    const delete_list = delete_users.map(user => user.get('full_name'))

    await sendMessage(req, {
      channel_id: req.params.id,
      type: 'action',
      text: `removed ${toOxfordList(delete_list)} from the conversation`
    })

  }

  const subscriptions = await Subscription.where({
    channel_id: req.params.id
  }).fetchAll({
    withRelated: ['user'],
    transacting: req.trx
  }).then(subscriptions => subscriptions.toArray())

  const subscriber_list = subscriptions.map(subscription => {
    return subscription.related('user').get('full_name')
  }).join(' ')

  await channel.save({
    subscriber_list
  }, { patch: true, transacting: req.trx })

  await channel.load(['owner.photo','subscriptions.user.photo','last_message'], {
    transacting: req.trx
  })

  await socket.message(req, [
    ...subscriptions.map(subscription => ({
      channel: `/admin/users/${subscription.get('user_id')}`,
      target: '/chat/channels/messages',
      action: 'update_channel',
      data: {
        channel: ChannelSerializer(req, channel)
      }
    })),
    ...add_ids.map(user_id => ({
      channel: `/admin/users/${user_id}`,
      target: '/chat/channels/messages',
      action: 'add_channel',
      data: {
        channel: ChannelSerializer(req, channel)
      }
    })),
    ...delete_ids.map(user_id => ({
      channel: `/admin/users/${user_id}`,
      target: '/chat/channels/messages',
      action: 'remove_channel',
      data: {
        channel_id: req.params.id
      }
    }))
  ])

  res.status(200).respond(channel, ChannelSerializer)

}


export default updateRoute
