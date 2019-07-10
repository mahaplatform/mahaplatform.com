const Answer = {

  up: async (knex) => {
    return await knex.schema.createTable('training_answers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('question_id').unsigned()
      table.foreign('question_id').references('training_questions.id')
      table.integer('delta')
      table.text('text')
      table.boolean('is_active')
      table.boolean('is_correct')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_answers')
  }

}

export default Answer
