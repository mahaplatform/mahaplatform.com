const CreateReimbursements = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('expenses_reimbursements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.integer('vendor_id').unsigned()
      table.foreign('vendor_id').references('expenses_vendors.id')
      table.integer('status_id').unsigned()
      table.foreign('status_id').references('expenses_statuses.id')
      table.integer('batch_id').unsigned()
      table.foreign('batch_id').references('expenses_batches.id')
      table.date('date')
      table.text('description')
      table.decimal('amount', 6, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_reimbursements')
  }

}

export default CreateReimbursements
