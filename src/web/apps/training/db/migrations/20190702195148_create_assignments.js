const Assignment = {

  up: async (knex) => {
    return await knex.schema.createTable('training_assignments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assigning_id').unsigned()
      table.foreign('assigning_id').references('training_assignings.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('option_id').unsigned()
      table.foreign('option_id').references('training_options.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_assignments')
  }

}

export default Assignment
