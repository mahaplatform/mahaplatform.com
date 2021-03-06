const CreateResults = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('chat_messages', (table) => {
      table.integer('quoted_message_id').unsigned()
      table.foreign('quoted_message_id').references('chat_messages.id')
    })

  },

  down: async (knex) => {

    await knex.schema.table('chat_channels', (table) => {
      table.dropColumn('quoted_message_id')
    })

  }

}

export default CreateResults
