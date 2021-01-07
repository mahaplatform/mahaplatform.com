const CreateChannels = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('chat_channels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('channel_type_id').unsigned()
      table.foreign('channel_type_id').references('chat_channel_types.id')
      table.string('code')
      table.string('name')
      table.boolean('is_archived')
      table.boolean('is_private')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('chat_channels')
  }

}

export default CreateChannels
