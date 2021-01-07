const CreateDomains = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.boolean('is_primary')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_domains')
  }

}

export default CreateDomains
