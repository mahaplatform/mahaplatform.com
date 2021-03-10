import socket from '@core/services/routes/emitter'
import Channel from '@apps/chat/models/channel'

const destroyRoute = async (req, res) => {

  const channel = await Channel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.channel_id', 'chat_channels.id')
    qb.where('chat_subscriptions.user_id', req.user.get('id'))
    qb.where('chat_channels.id', req.params.id)
  }).fetch({
    withRelated: ['owner.photo','subscriptions.user.photo','last_message','stars'],
    transacting: req.trx
  })

  await req.trx('maha_stars').where({
    starrable_type: 'chat_channels',
    starrable_id: req.params.id
  }).delete()

  await req.trx('chat_channels').where({
    id: req.params.id
  }).update({
    last_message_id: null
  })

  await req.trx('chat_subscriptions').where({
    channel_id: req.params.id
  }).delete()

  await req.trx('chat_messages').whereNotNull('quoted_message_id').update({
    quoted_message_id: null
  })
  const messages = await req.trx('chat_messages').where({
    channel_id: req.params.id
  })

  const message_ids = messages.map(message => message.id)

  await req.trx('maha_stars').where({
    starrable_type: 'chat_messages'
  }).whereIn('starrable_id', message_ids).delete()

  await req.trx('maha_reactions').where({
    reactable_type: 'chat_messages'
  }).whereIn('reactable_type', message_ids).delete()

  await req.trx('chat_messages').where({
    channel_id: req.params.id
  }).delete()

  const removeChannel = channel.related('subscriptions').map(subscription => ({
    channel: `/admin/users/${subscription.get('user_id')}`,
    target: '/admin/chat/messages',
    action: 'remove_channel',
    data: {
      channel_id: channel.get('id')
    }
  }))

  await channel.destroy({
    transacting: req.trx
  })

  await socket.message(req, removeChannel)

  await res.status(200).respond(true)

}

export default destroyRoute
