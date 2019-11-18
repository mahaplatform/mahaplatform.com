const CreateProduct = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_products', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('expenses_projects.id')
      table.integer('revenue_type_id').unsigned()
      table.foreign('revenue_type_id').references('expenses_revenue_types.id')
      table.enum('price_type', ['fixed','sliding_scale'], { useNative: true, enumName: 'expenses_products_price_type' })
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.boolean('is_active')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_products')
  }

}

export default CreateProduct
