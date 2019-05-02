import ChannelSerializer from '../../../serializers/channel_serializer'
import { sendMessage } from '../../../services/channels'
import Channel from '../../../models/channel'
import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const channel = await Channel.where({
    id : req.params.id
  }).fetch({ transacting: trx })

  await channel.save({
    is_archived: !channel.get('is_archived')
  }, { patch: true, transacting: trx})

  await sendMessage(req, trx, {
    channel_id: req.params.id,
    type: 'action',
    text: channel.get('is_archived') ? 'archived the channel' : 'activated the channel'
  })

  await channel.load(['owner.photo','subscriptions.user.photo','last_message','stars'], {
    transacting: trx
  })

  return channel

}

const messages = (req, trx, result, options) => {

  const action = result.get('is_archived') ? 'archive_channel' : 'activate_channel'

  return result.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/chat/channels/messages',
    action,
    data: {
      channel_id: result.get('id')
    }
  }))

}

const archiveRoute = new Route({
  messages,
  method: 'patch',
  path: '/archive',
  processor,
  serializer: ChannelSerializer
})

export default archiveRoute
