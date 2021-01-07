const CreateChannelTypes = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('chat_channel_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('chat_channel_types')
  }

}

export default CreateChannelTypes
