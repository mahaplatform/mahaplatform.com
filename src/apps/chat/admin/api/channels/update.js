import { activity } from '@core/services/routes/activities'
import ChannelSerializer from '@apps/chat/serializers/channel_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Channel from '@apps/chat/models/channel'

const updateRoute = async (req, res) => {

  const channel = await Channel.query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
    qb.where('chat_subscriptions.user_id', req.user.get('id'))
    qb.where('chat_channels.id', req.params.id)
    qb.where('chat_channels.team_id', req.team.get('id'))
  }).fetch({
    withRelated: ['owner.photo','subscriptions.user.photo','last_message','stars'],
    transacting: req.trx
  })

  if(!channel) return res.status(404).respond({
    code: 404,
    message: 'Unable to find channel'
  })

  await channel.save(whitelist(req.body, ['name','description']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated a conversation',
    object: channel
  })

  await socket.message(req, channel.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/admin/chat/messages',
    action: 'update_channel',
    data: {
      channel: ChannelSerializer(req, channel)
    }
  })))

  await res.status(200).respond(channel, ChannelSerializer)

}

export default updateRoute
