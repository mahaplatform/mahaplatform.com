import MessageSerializer from '../../../serializers/message_serializer'
import Message from '../../../models/message'
import { BackframeError, Route, User } from 'maha'

const loadSubscriptions = async (req, trx, result, options) => {

  const subscriptions = await User.query(qb => {

    qb.innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id')

    qb.where('chat_subscriptions.channel_id', req.params.channel_id)

    qb.whereNot('chat_subscriptions.user_id', req.user.get('id'))

  }).fetchAll({
    transacting: trx
  })

  req.subscription_ids = subscriptions.toArray().map(user => user.get('id'))

}

const beforeProcessor = async (req, trx, result, options) => {

  await loadSubscriptions(req, trx, result, options)

}

const destroyMessage = async (req, trx, result, options) => {

  const subscription_ids = [
    ...req.subscription_ids,
    req.user.get('id')
  ]

  return subscription_ids.map(user_id => ({
    channel: `/admin/users/${user_id}`,
    target: '/admin/chat/messages',
    action: 'remove_message',
    data: {
      channel_id: result.get('channel_id'),
      code: result.get('code')
    }
  }))

}

const messages = destroyMessage

const processor = async (req, trx, options) => {

  req.resource = await Message.where({
    id: req.params.id
  }).fetch({
    transacting: trx,
    withRelated: ['channel']
  })

  if(!req.resource) {

    throw new BackframeError({
      code: 404,
      message: 'Unable to load record'
    })

  }

  try {

    const frozen = await Message.where({
      id: req.params.id
    }).fetch({
      transacting: trx
    })

    const last_message = await Message.query(qb => {

      qb.where('channel_id', req.resource.get('channel_id'))

      qb.whereNot('id', req.resource.get('id'))

      qb.whereRaw('created_at < ?', req.resource.get('created_at'))

      qb.orderBy('created_at', 'desc')

    }).fetch({
      transacting: trx
    })

    const channel = req.resource.related('channel')

    await options.knex('chat_subscriptions').transacting(trx).where({
      last_message_id: req.resource.get('id')
    }).update({
      last_message_id: last_message ? last_message.get('id') : null
    })

    await channel.save({
      last_message_id: last_message ? last_message.get('id') : null
    }, { transacting: trx })


    await options.knex('maha_stars').transacting(trx).where({
      starrable_type: 'chat_messages'
    }).where('starrable_id', req.resource.get('id')).delete()

    await options.knex('maha_reactions').transacting(trx).where({
      reactable_type: 'chat_messages'
    }).where('reactable_type', req.resource.get('id')).delete()

    await req.resource.destroy({ transacting: trx })

    return frozen

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to update record',
      errors: err.errors ? err.toJSON() : err.message
    })

  }

}

const destroyRoute = new Route({
  beforeProcessor,
  messages,
  method: 'delete',
  path: '/:id',
  processor,
  serializer: MessageSerializer
})

export default destroyRoute
