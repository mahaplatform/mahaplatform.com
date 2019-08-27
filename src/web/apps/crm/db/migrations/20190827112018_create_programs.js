const CreateProgram = {

  up: async (knex) => {
    await knex.schema.createTable('crm_programs', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_programs')
  }

}

export default CreateProgram
