import ChannelSerializer from '@apps/chat/serializers/channel_serializer'
import Channel from '@apps/chat/models/channel'

const listRoute = async (req, res) => {

  const channels = await Channel.filterFetch({
    scope: (qb) => {
      qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
      qb.where('chat_subscriptions.user_id', req.user.get('id'))
      qb.where('chat_channels.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['name','subscriber_list']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-last_message_at'
    },
    page: req.query.$page,
    withRelated: ['owner.photo','subscriptions.user.photo','last_message.attachments','stars'],
    transacting: req.trx
  })

  await res.status(200).respond(channels, ChannelSerializer)

}

export default listRoute
