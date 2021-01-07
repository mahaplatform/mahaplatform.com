const CreateSearches = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_searches', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('text')
      table.string('route')
      table.jsonb('extra')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_searches')
  }

}

export default CreateSearches
