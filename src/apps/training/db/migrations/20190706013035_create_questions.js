const Question = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('training_questions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('quiz_id').unsigned()
      table.foreign('quiz_id').references('training_quizes.id')
      table.integer('delta')
      table.text('text')
      table.text('explanation')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_questions')
  }

}

export default Question
