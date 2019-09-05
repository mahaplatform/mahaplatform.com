const CreateProgram = {

  up: async (knex) => {
    await knex.schema.createTable('maha_programs', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.string('code')
      table.boolean('is_private')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_programs')
  }

}

export default CreateProgram
