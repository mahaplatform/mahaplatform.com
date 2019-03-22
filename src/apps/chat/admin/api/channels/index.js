import ChannelSerializer from '../../../serializers/channel_serializer'
import { Resources } from 'maha'
import Channel from '../../../models/channel'
import archive from './archive'
import create from './create'
import leave from './leave'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')

  qb.where('chat_subscriptions.user_id', req.user.get('id'))

}

const messages = {
  update: (req, trx, result, options) => {
    return result.related('subscriptions').map(subscription => ({
      channel: `/admin/users/${subscription.get('user_id')}`,
      target: '/admin/chat/messages',
      action: 'update_channel',
      data: {
        channel: ChannelSerializer(req, trx, result)
      }
    }))
  },
  destroy: (req, trx, result, options) => {
    return req.subscription_ids.map(user_id => ({
      channel: `/admin/users/${user_id}`,
      target: '/admin/chat/messages',
      action: 'remove_channel',
      data: {
        channel_id: result.get('id')
      }
    }))
  }
}

const destroyBeforeProcessor = async (req, trx, options) => {

  req.subscription_ids = req.resource.related('subscriptions').map(subscription => {
    return subscription.get('user_id')
  })

  await options.knex('maha_stars').transacting(trx).where({
    starrable_type: 'chat_channels',
    starrable_id: req.params.id
  }).delete()

  await options.knex('chat_channels').transacting(trx).where({
    id: req.params.id
  }).update({
    last_message_id: null
  })

  await options.knex('chat_subscriptions').transacting(trx).where({
    channel_id: req.params.id
  }).delete()

  await options.knex('chat_messages').transacting(trx).whereNotNull('quoted_message_id').update({
    quoted_message_id: null
  })
  const messages = await options.knex('chat_messages').transacting(trx).where({
    channel_id: req.params.id
  })

  const message_ids = messages.map(message => message.id)

  await options.knex('maha_stars').transacting(trx).where({
    starrable_type: 'chat_messages'
  }).whereIn('starrable_id', message_ids).delete()

  await options.knex('maha_reactions').transacting(trx).where({
    reactable_type: 'chat_messages'
  }).whereIn('reactable_type', message_ids).delete()

  await options.knex('chat_messages').transacting(trx).where({
    channel_id: req.params.id
  }).delete()

}

const channelResources = new Resources({
  allowedParams: ['name','description'],
  beforeProcessor: {
    destroy: destroyBeforeProcessor
  },
  collectionActions: [
    create
  ],
  defaultQuery,
  defaultSort: '-last_message_at',
  except: ['create'],
  memberActions: [
    leave,
    archive
  ],
  messages,
  model: Channel,
  path: '/channels',
  serializer: ChannelSerializer,
  searchParams: ['name','subscriber_list'],
  withRelated: ['owner.photo','subscriptions.user.photo','last_message.attachments','stars']
})

export default channelResources
