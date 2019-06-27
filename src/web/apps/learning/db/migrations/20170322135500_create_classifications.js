const CreateClassifications = {

  up: async (knex) => {
    return await knex.schema.createTable('competencies_classifications', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_classifications')
  }

}

export default CreateClassifications
