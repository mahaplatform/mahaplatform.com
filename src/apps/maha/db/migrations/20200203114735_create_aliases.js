const CreateAlias = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_aliases', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('src')
      table.string('destination')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_aliases')
  }

}

export default CreateAlias
