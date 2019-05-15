import ChannelSerializer from '../../../serializers/channel_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { sendMessage } from '../../../services/channels'
import Channel from '../../../models/channel'

const archiveRoute = async (req, res) => {

  const channel = await Channel.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
    qb.where('chat_subscriptions.user_id', req.user.get('id'))
    qb.where('chat_channels.id', req.params.id)
  }).fetch({
    withRelated: ['owner.photo','subscriptions.user.photo','last_message','stars'],
    transacting: req.trx
  })

  await channel.save({
    is_archived: !channel.get('is_archived')
  }, {
    patch: true,
    transacting: req.trx
  })

  await sendMessage(req, req.trx, {
    channel_id: req.params.id,
    type: 'action',
    text: channel.get('is_archived') ? 'archived the channel' : 'activated the channel'
  })

  await socket.message(req, channel.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/chat/channels/messages',
    action: channel.get('is_archived') ? 'archive_channel' : 'activate_channel',
    data: {
      channel_id: channel.get('id')
    }
  })))

  res.status(200).respond(channel, (channel) => {
    return ChannelSerializer(req, req.trx, channel)
  })

}

export default archiveRoute
