const CreateNumber = {

  up: async (knex) => {
    await knex.schema.createTable('maha_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('sid')
      table.string('number')
      table.string('locality')
      table.string('region')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_numbers')
  }

}

export default CreateNumber
