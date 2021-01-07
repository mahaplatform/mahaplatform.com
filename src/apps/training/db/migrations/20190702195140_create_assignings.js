const CreateAssigning = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('training_assignings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assigned_by_id').unsigned()
      table.foreign('assigned_by_id').references('maha_users.id')
      table.string('title')
      table.date('completed_by')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('training_assignings')
  }

}

export default CreateAssigning
