const CreateReceipts = {

  up: async (knex) => {
    return await knex.schema.createTable('expenses_receipts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('expense_id').unsigned()
      table.foreign('expense_id').references('expenses_expenses.id')
      table.integer('delta')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_receipts')
  }

}

export default CreateReceipts
