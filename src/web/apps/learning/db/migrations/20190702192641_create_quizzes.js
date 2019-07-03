const Quiz = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_quizes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('quizable_text')
      table.integer('quizable_id')
      table.integer('passing_score')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_quizes')
  }

}

export default Quiz
