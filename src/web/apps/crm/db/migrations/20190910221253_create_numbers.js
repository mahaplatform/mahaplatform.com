const CreateNumber = {

  up: async (knex) => {
    await knex.schema.createTable('crm_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('number')
      table.string('locality')
      table.string('region')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_numbers')
  }

}

export default CreateNumber
