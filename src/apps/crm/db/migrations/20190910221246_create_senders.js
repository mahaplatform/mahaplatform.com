const CreateSender = {

  up: async (knex) => {
    await knex.schema.createTable('crm_senders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.string('name')
      table.string('email')
      table.boolean('is_verified')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_senders')
  }

}

export default CreateSender
