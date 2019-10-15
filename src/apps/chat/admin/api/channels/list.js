import ChannelSerializer from '../../../serializers/channel_serializer'
import Channel from '../../../models/channel'

const listRoute = async (req, res) => {

  const channels = await Channel.scope(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
    qb.where('chat_subscriptions.user_id', req.user.get('id'))
    qb.where('chat_channels.team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['name','subscriber_list']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-last_message_at'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['owner.photo','subscriptions.user.photo','last_message.attachments','stars'],
    transacting: req.trx
  })

  res.status(200).respond(channels, ChannelSerializer)

}

export default listRoute
