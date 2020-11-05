import ChannelSerializer from '@apps/chat/serializers/channel_serializer'
import Channel from '@apps/chat/models/channel'

const showRoute = async (req, res) => {

  const channel = await Channel.query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
    qb.where('chat_subscriptions.user_id', req.user.get('id'))
    qb.where('chat_channels.id', req.params.id)
    qb.where('team_id', req.team.get('id'))
  }).fetch({
    withRelated: ['owner.photo','subscriptions.user.photo','last_message','stars'],
    transacting: req.trx
  })

  if(!channel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load channel'
  })

  res.status(200).respond(channel, ChannelSerializer)

}

export default showRoute
