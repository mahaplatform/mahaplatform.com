const Question = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_questions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('quiz_id').unsigned()
      table.foreign('quiz_id').references('learning_quizes.id')
      table.text('text')
      table.text('explanation')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_questions')
  }

}

export default Question
