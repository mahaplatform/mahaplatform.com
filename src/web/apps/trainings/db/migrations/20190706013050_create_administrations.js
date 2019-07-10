const Administration = {

  up: async (knex) => {
    return await knex.schema.createTable('training_administrations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('quiz_id').unsigned()
      table.foreign('quiz_id').references('training_quizes.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('correct_count')
      table.integer('total_count')
      table.boolean('was_passed')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_administrations')
  }

}

export default Administration
