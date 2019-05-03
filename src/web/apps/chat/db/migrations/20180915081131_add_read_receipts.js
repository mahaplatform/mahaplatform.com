import Migration from '../../../../../core/objects/migration'
import Channel from '../../models/channel'
import Message from '../../models/message'
import Subscription from '../../models/channel'

const AddReadReceipts = new Migration({

  up: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.integer('last_message_id').unsigned()
      table.foreign('last_message_id').references('chat_messages.id')
    })

    await knex.schema.table('chat_subscriptions', (table) => {
      table.integer('last_message_id').unsigned()
      table.foreign('last_message_id').references('chat_messages.id')
    })

    const channels = await knex('chat_channels')

    await Promise.map(channels, async (channel) => {

      const last_message = await knex('chat_messages').where({ channel_id: channel.id }).orderBy('created_at', 'desc').limit(1)

      await knex('chat_channels').where({
        id: channel.id
      }).update({
        last_message_id: last_message[0].id
      })

    })

    const subscriptions = await knex('chat_subscriptions')

    await Promise.map(subscriptions, async (subscription) => {

      const messages = await knex('chat_messages').where({ channel_id: subscription.channel_id }).orderBy('created_at', 'desc')

      const last_message = await Promise.reduce(messages, async (last_message, message) => {

        if(last_message) return last_message

        return message.created_at < subscription.last_viewed_at ? message : null

      }, null)

      if(!last_message) return

      await knex('chat_subscriptions').where({
        id: subscription.id
      }).update({
        last_message_id: last_message.id
      })

    })

  },

  down: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.dropColumn('last_message_id')
    })

    await knex.schema.table('chat_subscriptions', (table) => {
      table.dropColumn('last_message_id')
    })

  }

})

export default AddReadReceipts
