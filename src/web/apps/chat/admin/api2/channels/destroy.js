import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Channel from '../../../models/channel'

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

  await knex('maha_stars').transacting(req.trx).where({
    starrable_type: 'chat_channels',
    starrable_id: req.params.id
  }).delete()

  await knex('chat_channels').transacting(req.trx).where({
    id: req.params.id
  }).update({
    last_message_id: null
  })

  await knex('chat_subscriptions').transacting(req.trx).where({
    channel_id: req.params.id
  }).delete()

  await knex('chat_messages').transacting(req.trx).whereNotNull('quoted_message_id').update({
    quoted_message_id: null
  })
  const messages = await knex('chat_messages').transacting(req.trx).where({
    channel_id: req.params.id
  })

  const message_ids = messages.map(message => message.id)

  await knex('maha_stars').transacting(req.trx).where({
    starrable_type: 'chat_messages'
  }).whereIn('starrable_id', message_ids).delete()

  await knex('maha_reactions').transacting(req.trx).where({
    reactable_type: 'chat_messages'
  }).whereIn('reactable_type', message_ids).delete()

  await knex('chat_messages').transacting(req.trx).where({
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

  res.status(200).respond(true)

}

export default destroyRoute
