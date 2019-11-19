const CreateProjects = {

  up: async (knex) => {
    return await knex.schema.createTable('expenses_trips', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.integer('status_id').unsigned()
      table.foreign('status_id').references('expenses_statuses.id')
      table.date('date')
      table.text('description')
      table.time('time_leaving')
      table.time('time_arriving')
      table.integer('odometer_start').unsigned()
      table.integer('odometer_end').unsigned()
      table.integer('total_miles')
      table.decimal('mileage_rate', 6, 3)
      table.decimal('amount', 6, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_trips')
  }

}

export default CreateProjects
