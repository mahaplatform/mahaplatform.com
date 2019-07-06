const Lesson = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_lessons', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('learning_trainings.id')
      table.integer('delta')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_lessons')
  }

}

export default Lesson
