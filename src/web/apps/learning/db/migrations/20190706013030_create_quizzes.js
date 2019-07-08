const Quiz = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_quizes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('learning_trainings.id')
      table.integer('lesson_id').unsigned()
      table.foreign('lesson_id').references('learning_lessons.id')
      table.string('title')
      table.integer('passing_score')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_quizes')
  }

}

export default Quiz
