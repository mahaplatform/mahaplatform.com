const CreateEmailResult = {

  up: async (knex) => {
    await knex.schema.createTable('email_results', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('email_results')
  }

}

export default CreateEmailResult
