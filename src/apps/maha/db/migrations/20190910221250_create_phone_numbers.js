const CreatePhoneNumber = {

  up: async (knex) => {
    await knex.schema.createTable('maha_phone_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.enum('type', ['voice','fax'], { useNative: true, enumName: 'maha_phone_numbers_type' })
      table.string('sid')
      table.string('number')
      table.string('locality')
      table.string('region')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_phone_numbers')
  }

}

export default CreatePhoneNumber
