const Answer = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_answers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('question_id').unsigned()
      table.foreign('question_id').references('learning_questions.id')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_answers')
  }

}

export default Answer
