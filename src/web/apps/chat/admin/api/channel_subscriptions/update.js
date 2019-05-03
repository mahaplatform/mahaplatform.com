import ChannelSerializer from '../../../serializers/channel_serializer'
import { sendMessage } from '../../../services/channels'
import Subscription from '../../../models/subscription'
import Channel from '../../../models/channel'
import { toOxfordList } from '../../utils'
import { Route } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import moment from 'moment'
import _ from 'lodash'

const processor = async (req, trx, options) => {

  const channel_id = req.params.id

  const channel = await Channel.where({
    id: channel_id
  }).fetch({
    withRelated: ['subscriptions'],
    transacting: trx
  })

  const ids = channel.related('subscriptions').map(subscription => subscription.get('user_id'))

  const add_ids = req.body.ids.filter(id => !_.includes(ids, id))

  const delete_ids = ids.filter(id => {
    return !_.includes(req.body.ids, id) && id !== req.user.get('id')
  })

  if(add_ids.length > 0) {

    await options.knex('chat_subscriptions').transacting(trx).insert(add_ids.map(user_id => ({
      team_id: req.team.get('id'),
      channel_id,
      user_id,
      created_at: moment(),
      updated_at: moment(),
      last_viewed_at: moment()
    })))

    const add_users = await User.query(qb => {
      qb.whereIn('id', add_ids)
    }).fetchAll({ transacting: trx })

    const add_list = add_users.map(user => user.get('full_name'))

    await sendMessage(req, trx, {
      channel_id,
      type: 'action',
      text: `added ${toOxfordList(add_list)} to the conversation`
    })

  }

  if(delete_ids.length > 0) {

    await options.knex('chat_subscriptions').transacting(trx).where({
      channel_id
    }).whereIn('user_id', delete_ids).delete()

    const delete_users = await User.query(qb => {
      qb.whereIn('id', delete_ids)
    }).fetchAll({ transacting: trx })

    const delete_list = delete_users.map(user => user.get('full_name'))

    await sendMessage(req, trx, {
      channel_id,
      type: 'action',
      text: `removed ${toOxfordList(delete_list)} from the conversation`
    })

  }

  req.add_ids = add_ids

  req.delete_ids = delete_ids

  const subscriptions = await Subscription.where({
    channel_id
  }).fetchAll({
    withRelated: ['user'],
    transacting: trx
  })

  const subscriber_list = subscriptions.toArray().map(subscription => {

    return subscription.related('user').get('full_name')

  }).join(' ')

  await channel.save({
    subscriber_list
  }, { patch: true, transacting: trx })

  await channel.load(['owner.photo','subscriptions.user.photo','last_message'], {
    transacting: trx
  })

  return channel

}

const messages = (req, trx, result, options) => {

  return [
    ...result.related('subscriptions').map(subscription => ({
      channel: `/admin/users/${subscription.get('user_id')}`,
      target: '/chat/channels/messages',
      action: 'update_channel',
      data: {
        channel: ChannelSerializer(req, trx, result)
      }
    })),
    ...req.add_ids.map(user_id => ({
      channel: `/admin/users/${user_id}`,
      target: '/chat/channels/messages',
      action: 'add_channel',
      data: {
        channel: ChannelSerializer(req, trx, result)
      }
    })),
    ...req.delete_ids.map(user_id => ({
      channel: `/admin/users/${user_id}`,
      target: '/chat/channels/messages',
      action: 'remove_channel',
      data: {
        channel_id: result.get('id')
      }
    }))
  ]

}

const assignRoute = new Route({
  messages,
  method: 'patch',
  path: '/subscriptions',
  processor
})

export default assignRoute
