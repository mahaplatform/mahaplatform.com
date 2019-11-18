const CreateLineItem = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_line_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('expenses_invoices.id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('expenses_products.id')
      table.integer('quantity')
      table.decimal('price',6, 2)
      table.decimal('tax_rate', 3, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_line_items')
  }

}

export default CreateLineItem
