import ChannelSerializer from '../../../serializers/channel_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { sendMessage } from '../../../services/channels'
import knex from '../../../../../core/services/knex'
import Channel from '../../../models/channel'

const leaveRoute = async (req, res) => {

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

  await knex('chat_subscriptions').transacting(req.trx).where({
    user_id: req.user.get('id'),
    channel_id: req.params.id
  }).delete()

  await sendMessage(req, req.trx, {
    channel_id: req.params.id,
    type: 'action',
    text: 'left the channel'
  })

  const updateChannel = channel.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/chat/channels/messages',
    action: 'update_channel',
    data: {
      channel: ChannelSerializer(req, req.trx, channel)
    }
  }))

  const removeChannel = {
    channel: 'user',
    target: '/chat/channels/messages',
    action: 'remove_channel',
    data: {
      channel_id: parseInt(req.params.id)
    }
  }

  await socket.message(req, [
    ...updateChannel,
    removeChannel
  ])

  res.status(200).respond(channel, (channel) => {
    return ChannelSerializer(req, req.trx, channel)
  })

}

export default leaveRoute
