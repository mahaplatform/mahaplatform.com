const Assignment = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_assignments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assigned_by_id').unsigned()
      table.foreign('assigned_by_id').references('maha_users.id')
      table.integer('employee_id').unsigned()
      table.foreign('employee_id').references('maha_users.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('learning_trainings.id')
      table.integer('offering_id').unsigned()
      table.foreign('offering_id').references('learning_offerings.id')
      table.boolean('is_complete')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_assignments')
  }

}

export default Assignment
