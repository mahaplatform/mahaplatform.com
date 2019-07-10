const Assignment = {

  up: async (knex) => {
    return await knex.schema.createTable('training_assignments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assigned_by_id').unsigned()
      table.foreign('assigned_by_id').references('maha_users.id')
      table.integer('employee_id').unsigned()
      table.foreign('employee_id').references('maha_users.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('training_trainings.id')
      table.integer('offering_id').unsigned()
      table.foreign('offering_id').references('training_offerings.id')
      table.text('feedback')
      table.date('completed_by')
      table.timestamp('completed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_assignments')
  }

}

export default Assignment
