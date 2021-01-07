const CreateFilter = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_filters', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.string('code')
      table.string('title')
      table.text('description')
      table.jsonb('criteria')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_filters')
  }

}

export default CreateFilter
