import { Migration } from 'maha'

const UpdateChannels = new Migration({

  up: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.dropColumn('is_private')
      table.dropColumn('channel_type_id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.string('subscriber_list')
    })

    const channels = await knex('chat_channels')

    await Promise.map(channels, async (channel) => {

      const channel_id = channel.id

      const owner_id = 79

      const subscribers = await knex('maha_users').innerJoin('chat_subscriptions', 'chat_subscriptions.user_id', 'maha_users.id').where({ channel_id })

      const subscriber_list = subscribers.map(user => `${user.first_name} ${user.last_name}`).join(' ')

      await knex('chat_channels').where({ id: channel.id }).update({ owner_id, subscriber_list })

    })

    await knex.schema.dropTable('chat_channel_types')

  },

  down: async (knex) => {}

})

export default UpdateChannels
