const Offering = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_offerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('learning_trainings.id')
      table.date('date')
      table.time('starts_at')
      table.time('ends_at')
      table.string('location')
      table.integer('limit')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_offerings')
  }

}

export default Offering
