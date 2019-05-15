import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import User from '../../../../maha/models/user'
import Message from '../../../models/message'

const destroyRoute = async (req, res) => {

  const message = await Message.scope({
    team: req.team
  }).where({
    id: req.params.id
  }).fetch({
    transacting: req.trx,
    withRelated: ['channel']
  })

  if(!message) return res.status(404).respond({
    code: 404,
    message: 'Unable to load message'
  })

  const last_message = await Message.query(qb => {
    qb.where('channel_id', message.get('channel_id'))
    qb.whereNot('id', message.get('id'))
    qb.whereRaw('created_at < ?', message.get('created_at'))
    qb.orderBy('created_at', 'desc')
  }).fetch({
    transacting: req.trx
  })

  await knex('chat_subscriptions').transacting(req.trx).where({
    last_message_id: message.get('id')
  }).update({
    last_message_id: last_message ? last_message.get('id') : null
  })

  await knex('chat_channels').transacting(req.trx).where({
    last_message_id: message.get('id')
  }).update({
    last_message_id: last_message ? last_message.get('id') : null
  })

  await knex('maha_stars').transacting(req.trx).where({
    starrable_type: 'chat_messages'
  }).where('starrable_id', message.get('id')).delete()

  await knex('maha_reactions').transacting(req.trx).where({
    reactable_type: 'chat_messages'
  }).where('reactable_type', message.get('id')).delete()

  const subscription_ids = await User.query(qb => {
    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')
    qb.where('chat_subscriptions.channel_id', req.params.channel_id)
    qb.whereNot('chat_subscriptions.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(subscriptions => subscriptions.toArray().map(user => {
    return user.get('id')
  }))

  const removeMessage = [
    ...subscription_ids,
    req.user.get('id')
  ].map(user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'remove_message',
    data: {
      channel_id: message.get('channel_id'),
      code: message.get('code')
    }
  }))

  await message.destroy({
    transacting: req.trx
  })

  await socket.message(req, removeMessage)

  res.status(200).respond(true)

}

export default destroyRoute
