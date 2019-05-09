import Migration from '../../../../core/objects/migration'

const CreateExpenseTypesProjects = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('expenses_expense_types_projects', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expenses_expense_types.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_expense_types_projects')
  }

})

export default CreateExpenseTypesProjects
