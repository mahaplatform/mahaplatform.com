import ChannelSerializer from '../../../serializers/channel_serializer'
import { sendMessage } from '../../../services/channels'
import Channel from '../../../models/channel'
import { Route, knex } from 'maha'

const processor = async (req, trx, options) => {

  const channel = await Channel.where({
    id : req.params.id
  }).fetch({ transacting: trx })

  await knex('chat_subscriptions').transacting(trx).where({
    user_id: req.user.get('id'),
    channel_id: req.params.id
  }).delete()

  await sendMessage(req, trx, {
    channel_id: req.params.id,
    type: 'action',
    text: 'left the channel'
  })

  await channel.load(['owner.photo','subscriptions.user.photo','last_message','stars'], {
    transacting: trx
  })

  return channel

}

const messages = (req, trx, result, options) => [
  ...result.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/chat/channels/messages',
    action: 'update_channel',
    data: {
      channel: ChannelSerializer(req, trx, result)
    }
  })),
  {
    channel: 'user',
    target: '/chat/channels/messages',
    action: 'remove_channel',
    data: {
      channel_id: parseInt(req.params.id)
    }
  }
]

const leaveRoute = new Route({
  messages,
  method: 'patch',
  path: '/leave',
  processor,
  serializer: ChannelSerializer
})

export default leaveRoute
