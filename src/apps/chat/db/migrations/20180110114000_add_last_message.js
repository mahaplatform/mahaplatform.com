const AddLastMessage = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.timestamp('last_message_at')
    })

    const channels = await knex('chat_channels')

    await Promise.map(channels, async (channel) => {

      const channel_id = channel.id

      const messages = await knex('chat_messages').where({ channel_id }).orderBy('created_at', 'desc').limit(1)

      const last_message_at = messages[0].created_at

      await knex('chat_channels').where({ id: channel.id }).update({ last_message_at })

    })

  },

  down: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.dropColumn('last_message_at')
    })

  }

}

export default AddLastMessage
