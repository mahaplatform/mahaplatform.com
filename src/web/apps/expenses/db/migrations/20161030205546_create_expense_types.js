import Migration from '../../../../../core/objects/migration'

const CreateExpenseTypes = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('expenses_expense_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.jsonb('integration')
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_expense_types')
  }

})

export default CreateExpenseTypes
