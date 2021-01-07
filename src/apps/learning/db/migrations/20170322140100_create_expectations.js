const CreateExpectations = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('competencies_expectations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competencies_competencies.id')
      table.integer('classification_id').unsigned()
      table.foreign('classification_id').references('competencies_classifications.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_expectations')
  }

}

export default CreateExpectations
