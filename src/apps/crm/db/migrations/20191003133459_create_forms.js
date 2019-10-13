const CreateForm = {

  up: async (knex) => {
    await knex.schema.createTable('crm_forms', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.string('title')
      table.string('code')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_forms')
  }

}

export default CreateForm
