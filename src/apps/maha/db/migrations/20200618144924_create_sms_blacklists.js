const CreateSmsBlacklist = {

  up: async (knex) => {
    await knex.schema.createTable('maha_sms_blacklists', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('to_number_id').unsigned()
      table.foreign('to_number_id').references('maha_numbers.id')
      table.integer('from_number_id').unsigned()
      table.foreign('from_number_id').references('maha_numbers.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_sms_blacklists')
  }

}

export default CreateSmsBlacklist
